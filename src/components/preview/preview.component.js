import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as PdfJs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// Custom components
import * as AppAction from "../../store/actions/app.action";
import Spinner from "../spinner/spinner.component";
import {
  DEFAULT_ZOOM_LEVEL,
  createMultiplePages,
  renderPage,
  range,
} from "../../helpers/pdf";
import Translate from "../../helpers/translate";

// Styles
import "./preview.styles.scss";

function Preview() {
  // Set the worker
  PdfJs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  const dispatch = useDispatch();
  const uniqueId = useSelector(
    (state) => state.appReducer[AppAction.PDF_UNIQUE_ID]
  );
  const url = useSelector((state) => state.appReducer[AppAction.PDF_URL]);
  const pdfInstance = useSelector(
    (state) => state.appReducer[AppAction.PDF_INSTANCE]
  );
  const isLoadingPages = useSelector(
    (state) => state.appReducer[AppAction.LOADING_PAGES]
  );
  const currentPage = useSelector(
    (state) => state.appReducer[AppAction.PDF_CURRENT_PAGE]
  );
  const forceScroll = useSelector(
    (state) => state.appReducer[AppAction.PDF_FORCE_SCROLL]
  );
  const rotateSelectedPage = useSelector(
    (state) => state.appReducer[AppAction.ROTATE_SELECTED_PAGE]
  );
  const rotateAllPages = useSelector(
    (state) => state.appReducer[AppAction.ROTATE_ALL_PAGES]
  );
  const zoomLevel = useSelector(
    (state) => state.appReducer[AppAction.ZOOM_LEVEL]
  );
  const pageList = useSelector(
    (state) => state.appReducer[AppAction.PAGE_LIST]
  );

  const createPages = useCallback(createMultiplePages, []);

  const isProcessing = () => {
    return isLoadingPages || typeof isLoadingPages === "undefined";
  };

  // Read documents of the pdf and set the necessary values
  useEffect(() => {
    if (url && pdfInstance) {
      dispatch(AppAction.setLoadingPages(true));
      pdfInstance.promise
        .then((doc) => {
          dispatch(AppAction.setTotalPages(doc.numPages));
          dispatch(AppAction.setCurrentPage(1));
          const newZoomLevel = zoomLevel || DEFAULT_ZOOM_LEVEL;

          // Initialize to the final page list array
          const initialPageList = [];
          range(1, doc.numPages).forEach((pageNumber) =>
            initialPageList.push({
              pageNumber,
              order: pageNumber,
            })
          );

          createPages({
            doc,
            pdfElementId: `pdf-viewer-${uniqueId}`,
            pageList: initialPageList,
            canvasClassname: `react__pdf--preview-canvas-${newZoomLevel}`,
            canvasPrefix: `canvas_${uniqueId}`,
            pageLabel: Translate({ id: "page" }),
            reset: true,
          });

          dispatch(AppAction.setPageList(initialPageList));
          dispatch(AppAction.setLoadingPages(false));
        })
        .catch((e) => console.error("initialize@previewComponent", e));
    }

    // eslint-disable-next-line
  }, [url, pdfInstance, dispatch, createPages]);

  // Jump to a page based on currentPage
  useEffect(() => {
    if (currentPage && forceScroll) {
      let canvasElement = document.querySelector(
        `canvas:not(.react__pdf--drawer-thumbnail)[page-order="${currentPage}"]`
      );
      if (canvasElement) {
        canvasElement.scrollIntoView({ behavior: "smooth" });
        dispatch(AppAction.setForceScroll(false));
      }
    }

    // eslint-disable-next-line
  }, [currentPage, forceScroll]);

  function _updateCanvas({ oldCanvas, doc, page }) {
    if (!oldCanvas) return;
    const newZoomLevel = zoomLevel || DEFAULT_ZOOM_LEVEL;

    // Create new Dynamic element
    const newCanvas = document.createElement("canvas");
    newCanvas.id = oldCanvas.getAttribute("id");
    newCanvas.setAttribute("page-order", oldCanvas.getAttribute("page-order"));
    newCanvas.setAttribute("rotation", page.rotation);
    oldCanvas.parentNode.insertBefore(newCanvas, oldCanvas.nextSibling);
    oldCanvas.remove();

    let classNames = "mb-10";
    classNames += ` react__pdf--preview-canvas-${newZoomLevel} `;
    newCanvas.className = classNames;
    renderPage({
      doc,
      canvas: newCanvas,
      pageNumber: page.pageNumber,
      rotation: page.rotation,
    });
  }

  // Rotate selected page
  useEffect(() => {
    if (rotateSelectedPage && !isProcessing() && pdfInstance) {
      dispatch(AppAction.setLoadingPages(true));

      pdfInstance.promise
        .then((doc) => {
          const finalPageList = [...pageList];
          finalPageList.forEach((page) => {
            if (page.order === rotateSelectedPage.currentPage) {
              let oldRotate = isNaN(+page.rotation) ? 0 : +page.rotation;
              oldRotate += 90;
              if (oldRotate > 270) {
                oldRotate = 0;
              }
              page.rotation = oldRotate;
              const oldCanvas = document.querySelector(
                `canvas:not(.react__pdf--drawer-thumbnail)[page-order="${page.order}"]`
              );
              _updateCanvas({ oldCanvas, doc, page });
            }
          });

          dispatch(AppAction.setPageList(finalPageList));
          dispatch(AppAction.setLoadingPages(false));
        })
        .catch((e) => console.error("rotateSinglePage@previewComponent", e));
    }

    // eslint-disable-next-line
  }, [rotateSelectedPage, pdfInstance, dispatch]);

  // Rotate All pages
  useEffect(() => {
    if (rotateAllPages && !isProcessing() && pdfInstance) {
      const newZoomLevel = zoomLevel || DEFAULT_ZOOM_LEVEL;
      dispatch(AppAction.setLoadingPages(true));

      pdfInstance.promise
        .then((doc) => {
          // Initialize to the final page list array
          const finalPageList = [...pageList];
          finalPageList.forEach((page) => {
            page.rotation = rotateAllPages.rotation;
          });

          createPages({
            doc,
            pdfElementId: `pdf-viewer-${uniqueId}`,
            pageList: finalPageList,
            pageLabel: Translate({ id: "page" }),
            reset: true,
            canvasClassname: `react__pdf--preview-canvas-${newZoomLevel}`,
            canvasPrefix: `canvas_${uniqueId}`,
          });

          dispatch(AppAction.setPageList(finalPageList));
          dispatch(AppAction.setForceScroll(true));
          dispatch(AppAction.setCurrentPage(1));
          dispatch(AppAction.setLoadingPages(false));
        })
        .catch((e) => console.error("rotateAllPages@previewComponent", e));
    }

    // eslint-disable-next-line
  }, [rotateAllPages, pdfInstance, createPages, dispatch]);

  // Zoom till max generated pages
  useEffect(() => {
    if (zoomLevel && !isProcessing() && pdfInstance) {
      dispatch(AppAction.setLoadingPages(true));

      pdfInstance.promise
        .then((doc) => {
          const newPageList = [...pageList];
          newPageList.forEach((page) => {
            const canvasPrefix = `canvas_${uniqueId}_${page.pageNumber}`;
            const oldCanvas = document.getElementById(canvasPrefix);
            if (oldCanvas) {
              _updateCanvas({ oldCanvas, doc, page });
            }
          });
          dispatch(AppAction.setLoadingPages(false));
        })
        .catch((e) => console.error("zoomPage@previewComponent", e));
    }
    // eslint-disable-next-line
  }, [zoomLevel, pdfInstance, dispatch]);

  // Re-arrange pages
  useEffect(() => {
    if (pageList && !isProcessing() && pdfInstance) {
      const newZoomLevel = zoomLevel || DEFAULT_ZOOM_LEVEL;
      dispatch(AppAction.setLoadingPages(true));

      pdfInstance.promise
        .then((doc) => {
          const newPageList = [...pageList].sort((a, b) => a.order - b.order);
          // Re-create the pages
          createPages({
            doc,
            pdfElementId: `pdf-viewer-${uniqueId}`,
            pageList: newPageList,
            pageLabel: Translate({ id: "page" }),
            reset: true,
            canvasClassname: `react__pdf--preview-canvas-${newZoomLevel}`,
            canvasPrefix: `canvas_${uniqueId}`,
          });

          dispatch(AppAction.setForceScroll(true));
          dispatch(AppAction.setCurrentPage(newPageList[0].order));
          dispatch(AppAction.setLoadingPages(false));
        })
        .catch((e) => console.error("rearrangePages@previewComponent", e));
    }

    // eslint-disable-next-line
  }, [pageList, pdfInstance]);

  if (!uniqueId) return <Spinner />;

  return (
    <div
      onClick={() => {
        dispatch(AppAction.setDrawerVisibility(false));
      }}
      id={`pdf-viewer-${uniqueId}`}
      className="react__pdf--preview"
    ></div>
  );
}

export default Preview;
