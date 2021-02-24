import React, { useEffect, useRef } from "react";

// Custom components
import Preview from "components/preview/preview.component";
import Toolbar from "components/toolbar/toolbar.component";
import Drawer from "components/drawer/drawer.component";

// Styles
import "./global.scss";

function App() {
  const canvasViewer = useRef("");

  useEffect(() => {
    canvasViewer.current.addEventListener("scroll", () => {
      console.log("scrolling");
      console.log("window.pageYOffset", window.pageYOffset);
    });
  }, []);
  return (
    <div className="react__pdf--app" ref={canvasViewer}>
      <Toolbar />
      <Drawer />
      <Preview url="http://127.0.0.1:5500/test3.pdf" />
    </div>
  );
}

export default App;
