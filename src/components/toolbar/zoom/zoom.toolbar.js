import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";

// Custom components
import * as AppAction from "../../../store/actions/app.action";
import Translate from "../../../helpers/translate";

// Styles
import "./zoom.styles.scss";

function Zoom() {
  const dispatch = useDispatch();
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
    17: "500",
  };
  const [level, setLevel] = useState(8);

  const updateZoom = (newLevel) => {
    if (newLevel <= 1) {
      newLevel = 1;
    } else if (newLevel >= 17) {
      newLevel = 17;
    }
    setLevel(newLevel);
    dispatch(AppAction.setZoomLevel(zoomLevelMap[newLevel]));
  };

  return (
    <div className="react__pdf--zoom">
      <ReactTooltip />
      <i
        onClick={() => {
          const newLevel = level - 1;
          updateZoom(newLevel);
        }}
        data-tip={Translate({
          id: "zoom_out",
        })}
        className="fas fa-minus pointer"
      ></i>
      <div className="react__pdf--zoom-percentage">
        <select onChange={(e) => updateZoom(e.target.value)} value={level}>
          {Object.keys(zoomLevelMap).map((level) => (
            <option key={level} value={level}>
              {zoomLevelMap[level]}%
            </option>
          ))}
        </select>
      </div>
      <i
        onClick={() => {
          let newLevel = level + 1;
          updateZoom(newLevel);
        }}
        data-tip={Translate({
          id: "zoom_in",
        })}
        className="fas fa-plus pointer"
      ></i>
    </div>
  );
}

export default Zoom;
