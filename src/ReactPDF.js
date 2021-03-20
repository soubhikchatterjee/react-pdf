import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as PdfJs from "pdfjs-dist";

// Custom components
import * as AppAction from "./store/actions/app.action";
import Preview from "./components/preview/preview.component";
import Toolbar from "./components/toolbar/toolbar.component";
import Drawer from "./components/drawer/drawer.component";
import Rearrange from "./components/rearrange/rearrange.component";
import Spinner from "./components/spinner/spinner.component";
import NotFound from "./components/404/404.component";
import debounce from "./helpers/debounce";

// Styles
import "./resources/fontawesome/css/all.css"
import "./global.scss";

function ReactPDF({ uniqueId, pdfUrl, filename }) {
  const dispatch = useDispatch();
  const isLoadingPages = useSelector(
    (state) => state.appReducer[AppAction.LOADING_PAGES]
  );
  const isVisibleRearrangeModal = useSelector(
    (state) => state.appReducer[AppAction.REARRANGE_MODAL_VISIBILITY]
  );
  const url = useSelector((state) => state.appReducer[AppAction.PDF_URL]);
  const [error, setError] = useState(undefined);

  // Set the url to the store
  useEffect(() => {
    if (pdfUrl && filename && uniqueId) {
      fetch(pdfUrl)
        .then(() => {
          setError("");
          const pdfInstance = PdfJs.getDocument(pdfUrl);
          dispatch(AppAction.setPdfInstance(pdfInstance));
          dispatch(AppAction.setLoadingPages(true));
          dispatch(AppAction.setLoadingThumbnails(true));
          dispatch(AppAction.setUniqueId(uniqueId));
          dispatch(AppAction.setUrl(pdfUrl));
          dispatch(AppAction.setFilename(filename));
        })
        .catch((e) => {
          setError(e.message);
        });
    }
  }, [pdfUrl, filename, uniqueId, dispatch]);

  // When the user scrolls through the pages, we need to set the current page number
  useLayoutEffect(() => {
    const scrollListener = () => {
      let canvases = document.querySelectorAll("canvas");
      canvases.forEach((canvas) => {
        const canvasElement = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              debounce(() => {
                dispatch(
                  AppAction.setCurrentPage(+canvas.getAttribute("page-order"))
                );
              }, 400);
            }
          },
          {
            threshold: 0.3,
          }
        );
        canvasElement.observe(canvas);
      });
    };

    const documentBarElement = document.querySelector(".document-bar");
    if (documentBarElement) {
      documentBarElement.addEventListener("scroll", scrollListener);
    }

    return () =>
      documentBarElement &&
      documentBarElement.removeEventListener("scroll", scrollListener);
  }, [dispatch]);

  if (
    typeof isLoadingPages === "undefined" ||
    typeof url === "undefined" ||
    typeof error === "undefined" ||
    typeof isVisibleRearrangeModal === "undefined"
  ) {
    return (
      <div className="react__pdf--app">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="react__pdf--app">
      {/* Show loading backdrop */}
      {isLoadingPages && <Spinner />}

      <Toolbar />
      {url && <Drawer />}
      {isVisibleRearrangeModal && <Rearrange />}
      {!error && <Preview />}
      {error && <NotFound error={error} />}
    </div>
  );
}

export default ReactPDF;
