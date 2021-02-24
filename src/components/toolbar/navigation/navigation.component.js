import React from "react";

// Styles
import "./navigation.styles.scss";

function Navigation() {
  return (
    <div className="react__pdf--navigation">
      <i className="fas fa-caret-left pointer"></i>
      <div className="react__pdf--navigation-digits react__pdf--navigation-current-page">
        10
      </div>
      <div className="react__pdf--navigation-divider">/</div>
      <div className="react__pdf--navigation-digits react__pdf--navigation-total-pages">
        100
      </div>
      <i className="fas fa-caret-right pointer"></i>
    </div>
  );
}

export default Navigation;
