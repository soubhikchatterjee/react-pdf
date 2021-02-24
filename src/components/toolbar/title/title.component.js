import React from "react";
import ReactTooltip from "react-tooltip";

// Styles
import "./title.styles.scss";

function Title({ title }) {
  return (
    <div className="react__pdf--title">
      <ReactTooltip />
      <span data-tip={title}>{title}</span>
    </div>
  );
}

export default Title;
