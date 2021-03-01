import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import * as PdfJs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// Custom components
import * as AppAction from "store/actions/app.action";
import { createMultiplePages } from "helpers/pdf";

// Styles
import "./drawer.styles.scss";

function Drawer() {
  // Set the worker
  PdfJs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const dispatch = useDispatch();
  const pdfDocument = useSelector(
    state => state.appReducer[AppAction.PDF_DOCUMENT]
  );
  const showDrawer = useSelector(
    state => state.appReducer[AppAction.DRAWER_VISIBILITY]
  );

  const createPages = useCallback(({ doc, totalPages }) => {
    createMultiplePages({
      doc,
      startPage: 1,
      totalPages,
      rotation: 360,
      canvasPrefix: "canvas_thumbnail",
      pdfElement: "pdf-thumbnail-viewer",
      canvasClassname: "react__pdf--drawer-thumbnail",
      showPageNumber: true,
      pageNumberClassname: "react__pdf--drawer-thumbnail-page-number"
    });
  }, []);

  // Render First two pages (if more then 2 pages otherwise render first page)
  useEffect(() => {
    if (pdfDocument) {
      dispatch(AppAction.setTotalPages(pdfDocument.numPages));
      dispatch(AppAction.setCurrentPage(1));
      createPages({
        doc: pdfDocument,
        startPage: 1,
        totalPages: pdfDocument.numPages
      });
      dispatch(AppAction.setLoadingThumbnails(false));
    }
  }, [pdfDocument, dispatch, createPages]);

  return (
    <div
      className={classnames("react__pdf--drawer", {
        "react__pdf--drawer-open": showDrawer,
        "react__pdf--drawer-close": !showDrawer
      })}
    >
      {/* Close button */}
      <i
        className="fas fa-times react__pdf--drawer-close-button pointer"
        onClick={() => dispatch(AppAction.setDrawerVisibility(false))}
      ></i>
      <div className="clear-fix"></div>

      {/* Thumbnail wrapper */}
      <div
        id="pdf-thumbnail-viewer"
        className="react__pdf--drawer-thumbnails"
        onClick={e => {
          const pageNumber = e.target.getAttribute("page-number") || 1;
          dispatch(AppAction.setLoadingPages(true));
          dispatch(AppAction.setCurrentPage(+pageNumber));
        }}
      >
        {/* Placeholder for thumbnails */}
      </div>
      <div className="mb-40"></div>
    </div>
  );
}

export default Drawer;
