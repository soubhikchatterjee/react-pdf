import React, { useEffect, useCallback, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as PdfJs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// Custom components
import * as AppAction from "store/actions/app.action";
import {
  DEFAULT_ZOOM_LEVEL,
  createMultiplePages,
  renderPage,
  range
} from "helpers/pdf";

// Styles
import "./preview.styles.scss";

function Preview() {
  // Set the worker
  PdfJs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  const dispatch = useDispatch();
  const url = useSelector(state => state.appReducer[AppAction.PDF_URL]);
  const isLoadingPages = useSelector(
    state => state.appReducer[AppAction.LOADING_PAGES]
  );
  const isLoadingThumbnails = useSelector(
    state => state.appReducer[AppAction.LOADING_THUMBNAILS]
  );
  const currentPage = useSelector(
    state => state.appReducer[AppAction.PDF_CURRENT_PAGE]
  );
  const forceScroll = useSelector(
    state => state.appReducer[AppAction.PDF_FORCE_SCROLL]
  );
  const rotateSelectedPage = useSelector(
    state => state.appReducer[AppAction.ROTATE_SELECTED_PAGE]
  );
  const rotateAllPages = useSelector(
    state => state.appReducer[AppAction.ROTATE_ALL_PAGES]
  );
  const zoomLevel = useSelector(
    state => state.appReducer[AppAction.ZOOM_LEVEL]
  );
  const pageList = useSelector(state => state.appReducer[AppAction.PAGE_LIST]);

  const createPages = useCallback(createMultiplePages, []);

  const isProcessing = () => {
    return (
      isLoadingPages ||
      isLoadingThumbnails ||
      typeof isLoadingPages === "undefined" ||
      typeof isLoadingThumbnails === "undefined"
    );
  };

  // Read documents of the pdf and set the necessary values
  useEffect(() => {
    if (url) {
      dispatch(AppAction.setLoadingPages(true));
      PdfJs.getDocument(url)
        .promise.then(doc => {
          dispatch(AppAction.setTotalPages(doc.numPages));
          dispatch(AppAction.setCurrentPage(1));
          const newZoomLevel = zoomLevel || DEFAULT_ZOOM_LEVEL;
          const totalPages = doc.numPages;

          // Initialize to the final page list array
          const initialPageList = [];
          range(1, totalPages).forEach(pageNumber =>
            initialPageList.push({
              pageNumber: pageNumber,
              rotation: 0,
              order: pageNumber,
              zoom: newZoomLevel
            })
          );

          createPages({
            doc,
            pageList: initialPageList,
            canvasClassname: `react__pdf--preview-canvas-${newZoomLevel}`
          });

          dispatch(AppAction.setPageList(initialPageList));
          dispatch(AppAction.setLoadingPages(false));
        })
        .catch(e => console.error(e));
    }

    // eslint-disable-next-line
  }, [url, dispatch, createPages]);

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

  // Rotate selected page
  useEffect(() => {
    if (rotateSelectedPage && !isProcessing()) {
      dispatch(AppAction.setLoadingPages(true));
      const newZoomLevel = zoomLevel || DEFAULT_ZOOM_LEVEL;

      function updateCanvas(doc, page) {
        const canvas = document.querySelector(
          `canvas:not(.react__pdf--drawer-thumbnail)[page-order="${page.order}"]`
        );
        canvas.className = `mb-10 react__pdf--preview-canvas-${newZoomLevel}`;
        renderPage({
          doc,
          canvas,
          pageNumber: page.pageNumber,
          rotation: page.rotation
        });
      }

      PdfJs.getDocument(url).promise.then(doc => {
        const finalPageList = [...pageList];
        finalPageList.forEach(page => {
          if (page.order === rotateSelectedPage.currentPage) {
            if (rotateSelectedPage.direction === "LEFT") {
              page.rotation = +page.rotation - 90;
              updateCanvas(doc, page);
            } else {
              page.rotation = +page.rotation + 90;
              updateCanvas(doc, page);
            }
          }
        });

        dispatch(AppAction.setPageList(finalPageList));
        dispatch(AppAction.setLoadingPages(false));
      });
    }

    // eslint-disable-next-line
  }, [rotateSelectedPage, dispatch]);

  // Rotate All pages
  useEffect(() => {
    if (rotateAllPages && !isProcessing()) {
      const newZoomLevel = zoomLevel || DEFAULT_ZOOM_LEVEL;
      dispatch(AppAction.setLoadingPages(true));

      PdfJs.getDocument(url).promise.then(doc => {
        // Initialize to the final page list array
        const finalPageList = [...pageList];
        finalPageList.forEach(page => {
          page.rotation = rotateAllPages.rotation;
        });

        createPages({
          doc,
          pageList: finalPageList,
          reset: true,
          canvasClassname: `react__pdf--preview-canvas-${newZoomLevel}`
        });

        dispatch(AppAction.setPageList(finalPageList));
        dispatch(AppAction.setForceScroll(true));
        dispatch(AppAction.setCurrentPage(1));
        dispatch(AppAction.setLoadingPages(false));
      });
    }

    // eslint-disable-next-line
  }, [rotateAllPages, createPages, dispatch]);

  // Zoom till max generated pages
  useEffect(() => {
    if (zoomLevel && !isProcessing()) {
      dispatch(AppAction.setLoadingPages(true));

      PdfJs.getDocument(url).promise.then(doc => {
        const newPageList = [...pageList];
        newPageList.forEach(page => {
          const canvas = document.getElementById(`canvas_${page.pageNumber}`);
          if (canvas) {
            canvas.className = `mb-10 react__pdf--preview-canvas-${zoomLevel}`;
            renderPage({
              doc,
              canvas,
              pageNumber: page.pageNumber,
              rotation: page.rotation
            });
          }
        });
        dispatch(AppAction.setLoadingPages(false));
      });
    }
    // eslint-disable-next-line
  }, [zoomLevel, dispatch]);

  // Re-arrange pages
  useEffect(() => {
    if (pageList && !isProcessing()) {
      const newZoomLevel = zoomLevel || DEFAULT_ZOOM_LEVEL;
      dispatch(AppAction.setLoadingPages(true));
      PdfJs.getDocument(url).promise.then(doc => {
        const newPageList = [...pageList].sort((a, b) => a.order - b.order);
        // Re-create the pages
        createPages({
          doc,
          pageList: newPageList,
          reset: true,
          canvasClassname: `react__pdf--preview-canvas-${newZoomLevel}`
        });

        dispatch(AppAction.setForceScroll(true));
        dispatch(AppAction.setCurrentPage(newPageList[0].order));
        dispatch(AppAction.setLoadingPages(false));
      });
    }

    // eslint-disable-next-line
  }, [pageList]);

  return (
    <div
      onClick={() => {
        dispatch(AppAction.setDrawerVisibility(false));
      }}
      id="pdf-viewer"
      className="react__pdf--preview"
    ></div>
  );
}

export default Preview;
