import React from "react";
import ReactTooltip from "react-tooltip";

// Styles
import "./rearrange.styles.scss";

function Rearrange() {
  return (
    <div className="react__pdf-rearrange">
      <ReactTooltip />
      <i data-tip="Rearrange Pages" className="fas fa-sort pointer"></i>
    </div>
  );
}

export default Rearrange;
