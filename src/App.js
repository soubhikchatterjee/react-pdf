import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

// Custom components
import Preview from "components/preview/preview.component";
import Toolbar from "components/toolbar/toolbar.component";
import Drawer from "components/drawer/drawer.component";
import Spinner from "components/spinner/spinner.component";
import NotFound from "components/404/404.component";

// Custom components
import * as AppAction from "store/actions/app.action";

// Styles
import "./global.scss";

function App({ url }) {
  const canvasViewer = useRef("");
  const dispatch = useDispatch();
  const isLoadingPages = useSelector(
    state => state.appReducer[AppAction.LOADING_PAGES]
  );
  const isLoadingThumbnails = useSelector(
    state => state.appReducer[AppAction.LOADING_THUMBNAILS]
  );
  const [error, setError] = useState("");

  // Set the url to the store
  useEffect(() => {
    if (url) {
      fetch(url)
        .then(res => {
          dispatch(AppAction.setUrl(url));
          dispatch(AppAction.setLoadingPages(true));
          dispatch(AppAction.setLoadingThumbnails(true));
        })
        .catch(e => {
          setError(e.message);
        });
    }
  }, [url, dispatch]);

  useEffect(() => {
    canvasViewer.current.addEventListener("scroll", () => {
      console.log("scrolling");
      console.log("window.pageYOffset", window.pageYOffset);
    });
  }, []);
  return (
    <div className="react__pdf--app" ref={canvasViewer}>
      {/* Show loading backdrop */}
      {(isLoadingPages || isLoadingThumbnails) && <Spinner />}

      <Toolbar />
      <Drawer />
      {!error && <Preview />}
      {error && <NotFound error={error}/>}
    </div>
  );
}

export default App;
