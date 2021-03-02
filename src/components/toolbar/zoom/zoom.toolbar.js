import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";

// Custom components
import * as AppAction from "store/actions/app.action";

// Styles
import "./zoom.styles.scss";

function Zoom() {
  const dispatch = useDispatch();
  const zoomValue = useSelector(state => state.appReducer[AppAction.ZOOM_LEVEL]);
  const zoomLevelMap = {
    1: "25",
    2: "33",
    3: "50",
    4: "67",
    5: "75",
    6: "80",
    7: "90",
    8: "100",
    9: "110",
    10: "125",
    11: "150",
    12: "175",
    13: "200",
    14: "250",
    15: "300",
    16: "400",
    17: "500"
  };
  const [level, setLevel] = useState(8);

  return (
    <div className="react__pdf--zoom">
      <ReactTooltip />
      <i
        onClick={() => {
          let newLevel = level - 1;
          if (level <= 1) {
            newLevel = 1;
          } 
          setLevel(newLevel);
          dispatch(AppAction.setZoomLevel(zoomLevelMap[newLevel]));
        }}
        data-tip="Zoom Out"
        className="fas fa-minus pointer"
      ></i>
      <div className="react__pdf--zoom-percentage">
        {`${zoomValue || 100}%`}
      </div>
      <i
        onClick={() => {
          let newLevel = level + 1;
          if (level >= 17) {
            newLevel = 17;
          }
          setLevel(newLevel);
          dispatch(AppAction.setZoomLevel(zoomLevelMap[newLevel]));
        }}
        data-tip="Zoom In"
        className="fas fa-plus pointer"
      ></i>
    </div>
  );
}

export default Zoom;
