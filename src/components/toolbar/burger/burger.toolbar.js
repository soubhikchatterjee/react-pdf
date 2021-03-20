import React from "react";
import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";

// Custom components
import * as AppAction from "../../../store/actions/app.action";
import Translate from "../../../helpers/translate";

// Styles
import "./burger.styles.scss";

function Burger() {
  const dispatch = useDispatch();
  const showDrawer = useSelector(
    (state) => state.appReducer[AppAction.DRAWER_VISIBILITY]
  );
  const isThumbnailLoading = useSelector(
    (state) => state.appReducer[AppAction.LOADING_THUMBNAILS]
  );

  const isProcessing = () => {
    return isThumbnailLoading || typeof isThumbnailLoading === "undefined";
  };

  return (
    <div
      className={classnames("react__pdf--toolbar", {
        disabled: isProcessing(),
      })}
    >
      <ReactTooltip />
      <i
        onClick={() => dispatch(AppAction.setDrawerVisibility(!showDrawer))}
        data-tip={Translate({
          id: "show_thumbnails",
        })}
        className="fas fa-bars pointer react__pdf--bars"
      ></i>
    </div>
  );
}

export default Burger;
