import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";

// Custom components
import * as AppAction from "store/actions/app.action";

// Styles
import "./save.styles.scss";

function Save() {
  const dispatch = useDispatch();
  const isChangesSaved = useSelector(
    state => state.appReducer[AppAction.CHANGES_SAVED]
  );

  return (
    <div
      className={classnames("react__pdf--save", {
        "react__pdf--save-inactive":
          isChangesSaved === true || typeof isChangesSaved === "undefined"
      })}
    >
      <i
        onClick={() => {
          dispatch(AppAction.setChangesSaved(true));
        }}
        className="fas fa-save pointer"
      ></i>
    </div>
  );
}

export default Save;
