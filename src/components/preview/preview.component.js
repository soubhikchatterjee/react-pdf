import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as PdfJs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// Custom components
import * as AppAction from "store/actions/app.action";
import {
  INITIAL_MAX_PAGES,
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

  const createPages = useCallback(createMultiplePages, []);

  // Render First two pages (if more then 2 pages otherwise render first page)
  useEffect(() => {
    if (url) {
      PdfJs.getDocument(url)
        .promise.then(doc => {
          dispatch(AppAction.setDocument(doc));
          dispatch(AppAction.setTotalPages(doc.numPages));
          dispatch(AppAction.setCurrentPage(1));

          const totalPages =
            doc.numPages > INITIAL_MAX_PAGES ? INITIAL_MAX_PAGES : doc.numPages;

          createPages({ doc, startPage: 1, totalPages });
          dispatch(AppAction.setLoadingPages(false));
          dispatch(AppAction.setMaxPageGenerated(totalPages));
        })
        .catch(e => console.error(e));
    }
  }, [url, dispatch, createPages]);

  // Jump to a page based on currentPage
  useEffect(() => {
    if (pdfDocument && currentPage && maxPageGenerated) {
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
          totalPages
        });
        canvasElement = document.querySelector(`#canvas_${currentPage}`);
        dispatch(AppAction.setMaxPageGenerated(currentPage));
      }
      dispatch(AppAction.setLoadingPages(false));
      canvasElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [pdfDocument, currentPage, maxPageGenerated, createPages, dispatch]);

  // Rotate selected page
  useEffect(() => {
    if (rotateSelectedPages) {
      dispatch(AppAction.setLoadingPages(true));
      rotateSelectedPages.forEach(page => {
        const canvas = document.getElementById(`canvas_${page.pageNumber}`);
        renderPage({
          doc: pdfDocument,
          canvas,
          pageNumber: page.pageNumber,
          scale: 1,
          rotation: page.rotation
        });
      });

      dispatch(AppAction.setLoadingPages(false));
      dispatch(AppAction.setRotatePagesList(rotateSelectedPages));
      dispatch(AppAction.setLoadingPages(false));
    }

    // eslint-disable-next-line
  }, [rotateSelectedPages, dispatch]);

  // Rotate All pages
  useEffect(() => {
    if (rotateAllPages) {
      dispatch(AppAction.setLoadingPages(true));
      createPages({
        doc: pdfDocument,
        startPage: 1,
        totalPages: pdfDocument.numPages,
        rotation: rotateAllPages.rotation,
        reset: true
      });
      dispatch(AppAction.setLoadingPages(false));
      dispatch(AppAction.setMaxPageGenerated(pdfDocument.numPages));

      const rotatePageList = range(1, pdfDocument.numPages).map((_, idx) => ({
        pageNumber: idx + 1,
        rotation: rotateAllPages.rotation
      }));
      dispatch(AppAction.setRotatePagesList(rotatePageList));
    }

    // eslint-disable-next-line
  }, [rotateAllPages, createPages, dispatch]);

  return <div id="pdf-viewer" className="react__pdf--preview"></div>;
}

export default Preview;
