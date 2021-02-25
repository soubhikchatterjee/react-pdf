import React from "react";

// Styles
import "./spinner.styles.scss";

function Spinner() {
  return (
    <div className="react__pdf--spinner">
      <div className="lds-dual-ring"></div>
    </div>
  );
}

export default Spinner;
