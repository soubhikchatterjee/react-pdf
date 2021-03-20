import React from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";

// Custom Components
import * as AppAction from "../../store/actions/app.action";
import Burger from "./burger/burger.toolbar";
import Title from "./title/title.toolbar";
import Navigation from "./navigation/navigation.toolbar";
import Zoom from "./zoom/zoom.toolbar";
import Rotate from "./rotate/rotate.toolbar";
import Rearrange from "./rearrange/rearrange.toolbar";
import Save from "./save/save.toolbar";

// Styles
import "./toolbar.styles.scss";

function Toolbar() {
  const isLoadingPages = useSelector(
    state => state.appReducer[AppAction.LOADING_PAGES]
  );

  const isProcessing = () => {
    return isLoadingPages || typeof isLoadingPages === "undefined";
  };

  const canModifyPdf = () => {
    return true;
  };

  return (
    <div
      className={classnames("react__pdf--toolbar", {
        disabled: isProcessing()
      })}
    >
      <Burger />
      <Title />
      <Navigation />
      <Zoom />

      {canModifyPdf() && <Rotate />}
      {canModifyPdf() && <Rearrange />}
      {canModifyPdf() && <Save />}
    </div>
  );
}

export default Toolbar;
