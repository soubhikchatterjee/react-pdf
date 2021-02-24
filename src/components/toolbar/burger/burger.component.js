import React from "react";
import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from "react-redux";

// Custom components
import * as AppAction from "store/actions/app.action";

// Styles
import "./burger.styles.scss";

function Burger() {
  const dispatch = useDispatch();
  const showDrawer = useSelector(
    state => state.appReducer[AppAction.DRAWER_VISIBILITY]
  );

  return (
    <div>
      <ReactTooltip />
      <i
        onClick={() => dispatch(AppAction.setDrawerVisibility(!showDrawer))}
        data-tip="Show Thumbnails"
        className="fas fa-bars pointer react__pdf--bars"
      ></i>
    </div>
  );
}

export default Burger;
