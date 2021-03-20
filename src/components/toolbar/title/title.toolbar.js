import React from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";

// Custom Components
import * as AppAction from "../../../store/actions/app.action";

// Styles
import "./title.styles.scss";

function Title() {
  const filename = useSelector(
    state => state.appReducer[AppAction.PDF_FILENAME]
  );

  if (!filename) return "...";

  return (
    <>
      <ReactTooltip />
      <div data-tip={filename} className="react__pdf--title">
        <span>{filename}</span>
      </div>
    </>
  );
}

export default Title;
