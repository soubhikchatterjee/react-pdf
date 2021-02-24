import React from "react";
import ReactTooltip from "react-tooltip";

// Styles
import "./rotate.styles.scss";

function Rotate() {
  return (
    <div className="react__pdf--rotate">
      <ReactTooltip />
      <i data-tip="Rotate Left" className="fas fa-undo-alt pointer"></i>
      <i data-tip="Rotate Right" className="fas fa-redo-alt pointer"></i>
    </div>
  );
}

export default Rotate;
