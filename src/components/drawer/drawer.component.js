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
  const url = useSelector(state => state.appReducer[AppAction.PDF_URL]);
  const showDrawer = useSelector(
    state => state.appReducer[AppAction.DRAWER_VISIBILITY]
  );
  const pageList = useSelector(state => state.appReducer[AppAction.PAGE_LIST]);

  const createPages = useCallback(
    ({ doc}) => {
      createMultiplePages({
        doc,
        pageList,
        canvasPrefix: "canvas_thumbnail",
        pdfElement: "pdf-thumbnail-viewer",
        canvasClassname: "react__pdf--drawer-thumbnail",
        showPageNumber: true,
        pageNumberClassname: "react__pdf--drawer-thumbnail-page-number"
      });
    },
    [pageList]
  );

  // Render all thumbnails
  useEffect(() => {
    if (url) {
      PdfJs.getDocument(url).promise.then(doc => {
        dispatch(AppAction.setTotalPages(doc.numPages));
        createPages({
          doc
        });
        dispatch(AppAction.setLoadingThumbnails(false));
      });
    }
  }, [url, dispatch, createPages]);

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
          const pageOrderNumber = e.target.getAttribute("page-order") || 1;
          dispatch(AppAction.setCurrentPage(+pageOrderNumber));
          dispatch(AppAction.setForceScroll(true));
        }}
      >
        {/* Placeholder for thumbnails */}
      </div>
      <div className="mb-40"></div>
    </div>
  );
}

export default Drawer;
