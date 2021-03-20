import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import ReactTooltip from "react-tooltip";

// Custom components
import * as AppAction from "../../../store/actions/app.action";
import Translate from "../../../helpers/translate";

// Styles
import "./save.styles.scss";

function Save() {
  const dispatch = useDispatch();
  const isChangesSaved = useSelector(
    state => state.appReducer[AppAction.CHANGES_SAVED]
  );
  const changeId = useSelector(state => state.appReducer[AppAction.CHANGE_ID]);
  const pageList = useSelector(state => state.appReducer[AppAction.PAGE_LIST]);
  const [animate, setAnimate] = useState(false);

  // Animate the save icon
  useEffect(() => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  }, [changeId]);

  const commitChanges = async () => {
    dispatch(AppAction.setPageChanges(pageList));
  };

  return (
    <div
      className={classnames("react__pdf--save", {
        "react__pdf--save-inactive":
          isChangesSaved === true || typeof isChangesSaved === "undefined"
      })}
    >
      <ReactTooltip />
      <i
        onClick={() => {
          commitChanges();
          dispatch(AppAction.setChangesSaved(true));
        }}
        data-tip={Translate({
          id: "save_changes_to_pdf_file"
        })}
        className={classnames("fas fa-save pointer", {
          "react__pdf--save-spin": animate
        })}
      ></i>
    </div>
  );
}

export default Save;
