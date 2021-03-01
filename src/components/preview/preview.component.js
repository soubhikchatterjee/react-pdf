import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as PdfJs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// Custom components
import * as AppAction from "store/actions/app.action";
import {
  INITIAL_MAX_PAGES,
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
  const pdfDocument = useSelector(
    state => state.appReducer[AppAction.PDF_DOCUMENT]
  );
  const currentPage = useSelector(
    state => state.appReducer[AppAction.PDF_CURRENT_PAGE]
  );
  const maxPageGenerated = useSelector(
    state => state.appReducer[AppAction.PDF_MAX_PAGE_GENERATED]
  );
  const rotateSelectedPages = useSelector(
    state => state.appReducer[AppAction.ROTATE_SELECTED_PAGES]
  );
  const rotateAllPages = useSelector(
    state => state.appReducer[AppAction.ROTATE_ALL_PAGES]
  );
  const zoomLevel = useSelector(
    state => state.appReducer[AppAction.ZOOM_LEVEL]
  );
  const pageList = useSelector(state => state.appReducer[AppAction.PAGE_LIST]);

  const createPages = useCallback(createMultiplePages, []);

  // Render First two pages (if more then 2 pages otherwise render first page)
  useEffect(() => {
    if (url) {
      PdfJs.getDocument(url)
        .promise.then(doc => {
          dispatch(AppAction.setDocument(doc));
          dispatch(AppAction.setTotalPages(doc.numPages));
          dispatch(AppAction.setCurrentPage(1));
          const newZoomLevel = zoomLevel || DEFAULT_ZOOM_LEVEL;
          const totalPages =
            doc.numPages > INITIAL_MAX_PAGES ? INITIAL_MAX_PAGES : doc.numPages;

          createPages({
            doc,
            startPage: 1,
            totalPages,
            canvasClassname: `react__pdf--preview-canvas-${newZoomLevel}`
          });
          dispatch(AppAction.setLoadingPages(false));
          dispatch(AppAction.setMaxPageGenerated(totalPages));

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
          dispatch(AppAction.setPageList(initialPageList));
        })
        .catch(e => console.error(e));
    }

    // eslint-disable-next-line
  }, [url, dispatch, createPages]);

  // Jump to a page based on currentPage
  useEffect(() => {
    if (pdfDocument && currentPage && maxPageGenerated) {
      console.log("jump");
      const newZoomLevel = zoomLevel || DEFAULT_ZOOM_LEVEL;
      let canvasElement = document.querySelector(`#canvas_${currentPage}`);

      if (!canvasElement) {
        let startPage = currentPage,
          totalPages = maxPageGenerated;
        if (currentPage > maxPageGenerated) {
          startPage = maxPageGenerated + 1;
          totalPages = currentPage;
        }

        createPages({
          doc: pdfDocument,
          startPage,
          totalPages,
          canvasClassname: `react__pdf--preview-canvas-${newZoomLevel}`
        });
        canvasElement = document.querySelector(`#canvas_${currentPage}`);
        dispatch(AppAction.setMaxPageGenerated(currentPage));

        // Add a new page to the page list array
        const finalPageList = [...pageList];
        finalPageList.push({
          pageNumber: pageList.length + 1,
          rotation: 0,
          order: pageList.length + 1,
          zoom: newZoomLevel
        });
        dispatch(AppAction.setPageList(finalPageList));
      }
      dispatch(AppAction.setLoadingPages(false));
      canvasElement.scrollIntoView({ behavior: "smooth" });
    }

    // eslint-disable-next-line
  }, [pdfDocument, currentPage, maxPageGenerated, createPages, dispatch]);

  // Rotate selected page
  useEffect(() => {
    if (rotateSelectedPages) {
      console.log("rotate single");
      dispatch(AppAction.setLoadingPages(true));
      const finalPageList = [...pageList];
      const newZoomLevel = zoomLevel || DEFAULT_ZOOM_LEVEL;

      rotateSelectedPages.forEach(page => {
        const canvas = document.getElementById(`canvas_${page.pageNumber}`);
        canvas.className = `mb-10 react__pdf--preview-canvas-${newZoomLevel}`;
        renderPage({
          doc: pdfDocument,
          canvas,
          pageNumber: page.pageNumber,
          rotation: page.rotation
        });

        // Update page list
        const pageListItem = finalPageList.find(
          pageListObj => pageListObj.pageNumber === page.pageNumber
        );
        if (pageListItem) {
          pageListItem.rotation = page.rotation;
          dispatch(AppAction.setPageList(finalPageList));
        }
      });
      dispatch(AppAction.setLoadingPages(false));
      dispatch(AppAction.setLoadingPages(false));
    }

    // eslint-disable-next-line
  }, [rotateSelectedPages, dispatch]);

  // Rotate All pages
  useEffect(() => {
    if (rotateAllPages) {
      console.log("rotate all");
      const newZoomLevel = zoomLevel || DEFAULT_ZOOM_LEVEL;
      dispatch(AppAction.setLoadingPages(true));
      createPages({
        doc: pdfDocument,
        startPage: 1,
        totalPages: pdfDocument.numPages,
        rotation: rotateAllPages.rotation,
        reset: true,
        canvasClassname: `react__pdf--preview-canvas-${newZoomLevel}`
      });
      dispatch(AppAction.setLoadingPages(false));
      dispatch(AppAction.setMaxPageGenerated(pdfDocument.numPages));

      // Initialize to the final page list array
      const initialPageList = [];
      range(1, pdfDocument.numPages).forEach(pageNumber =>
        initialPageList.push({
          pageNumber,
          rotation: rotateAllPages.rotation,
          zoom: newZoomLevel,
          order: pageNumber
        })
      );
      dispatch(AppAction.setPageList(initialPageList));
    }

    // eslint-disable-next-line
  }, [rotateAllPages, createPages, dispatch]);

  // Zoom till max generated pages
  useEffect(() => {
    if (zoomLevel && pageList) {
      console.log("zoom");
      dispatch(AppAction.setLoadingPages(true));
      const newPageList = [...pageList];
      newPageList.forEach(page => {
        const canvas = document.getElementById(`canvas_${page.pageNumber}`);
        canvas.className = `mb-10 react__pdf--preview-canvas-${zoomLevel}`;
        renderPage({
          doc: pdfDocument,
          canvas,
          pageNumber: page.pageNumber,
          rotation: page.rotation
        });
        page.zoom = zoomLevel;
      });
      dispatch(AppAction.setPageList(newPageList));
      dispatch(AppAction.setLoadingPages(false));
    }

    // eslint-disable-next-line
  }, [zoomLevel, dispatch]);

  return <div id="pdf-viewer" className="react__pdf--preview"></div>;
}

export default Preview;
