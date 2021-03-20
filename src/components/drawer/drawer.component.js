import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import * as PdfJs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// Custom components
import * as AppAction from "../../store/actions/app.action";
import Spinner from "../spinner/spinner.component";
import { createMultiplePages } from "../../helpers/pdf";

import Translate from "../../helpers/translate";

// Styles
import "./drawer.styles.scss";

function Drawer() {
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
  const showDrawer = useSelector(
    (state) => state.appReducer[AppAction.DRAWER_VISIBILITY]
  );
  const isLoadingThumbnails = useSelector(
    (state) => state.appReducer[AppAction.LOADING_THUMBNAILS]
  );
  const pageList = useSelector(
    (state) => state.appReducer[AppAction.PAGE_LIST]
  );

  const createPages = useCallback(
    ({ doc }) => {
      createMultiplePages({
        doc,
        pageList,
        canvasPrefix: `canvas_thumbnail_${uniqueId}`,
        pdfElementId: `pdf-thumbnail-viewer-${uniqueId}`,
        canvasClassname: "react__pdf--drawer-thumbnail",
        showPageNumber: true,
        reset: true,
        pageLabel: Translate({ id: "page" }),
        pageNumberClassname: "react__pdf--drawer-thumbnail-page-number",
      });
    },
    [pageList, uniqueId]
  );

  // Render all thumbnails
  useEffect(() => {
    if (url && pdfInstance) {
      pdfInstance.promise
        .then((doc) => {
          createPages({
            doc,
          });
          dispatch(AppAction.setLoadingThumbnails(false));
        })
        .catch((e) => console.error("RenderAllThumbnails@drawerComponent", e));
    }
  }, [url, pdfInstance, dispatch, createPages]);

  if (
    isLoadingThumbnails ||
    typeof isLoadingThumbnails === "undefined" ||
    typeof url === "undefined"
  ) {
    return <Spinner />;
  }

  return (
    <div
      className={classnames("react__pdf--drawer", {
        "react__pdf--drawer-open": showDrawer,
        "react__pdf--drawer-close": !showDrawer,
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
        id={`pdf-thumbnail-viewer-${uniqueId}`}
        className="react__pdf--drawer-thumbnails"
        onClick={(e) => {
          const pageOrderNumber = e.target.getAttribute("page-order") || 1;
          dispatch(AppAction.setCurrentPage(+pageOrderNumber));
          dispatch(AppAction.setForceScroll(true));
        }}
      >
        {/* Placeholder for thumbnails */}
      </div>
    </div>
  );
}

export default React.memo(Drawer);
