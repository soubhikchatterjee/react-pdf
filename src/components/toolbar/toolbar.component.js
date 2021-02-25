import React from "react";

// Custom Components
import Burger from "./burger/burger.component";
import Title from "./title/title.component";
import Navigation from "./navigation/navigation.component";
import Zoom from "./zoom/zoom.component";
import Rotate from "./rotate/rotate.component";
import Rearrange from "./rearrange/rearrange.component";
import Save from "./save/save.component";

// Styles
import "./toolbar.styles.scss";

function Toolbar() {
  return (
    <div className="react__pdf--toolbar">
      <Burger />
      <Title title="Sample 00015.pdf" />
      <Navigation />
      <Zoom />
      <Rotate />
      <Rearrange />
      <Save />
    </div>
  );
}

export default Toolbar;
