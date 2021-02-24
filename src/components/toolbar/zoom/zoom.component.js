import React from "react";
import ReactTooltip from "react-tooltip";

// Styles
import "./zoom.styles.scss";

function Zoom() {
  return (
    <div className="react__pdf--zoom">
      <ReactTooltip />
      <i data-tip="Zoom Out" className="fas fa-minus pointer"></i>
      <input
        type="text"
        className="react__pdf--zoom-percentage"
        value="500%"
        onChange={() => {}}
      />
      <i data-tip="Zoom In" className="fas fa-plus pointer"></i>
    </div>
  );
}

export default Zoom;
