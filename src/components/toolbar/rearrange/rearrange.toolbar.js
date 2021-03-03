import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";

// Custom components
import * as AppAction from "store/actions/app.action";

// Styles
import "./rearrange.styles.scss";

function Rearrange() {
  const dispatch = useDispatch();
  const pageList = useSelector(state => state.appReducer[AppAction.PAGE_LIST]);

  return (
    <div
      onClick={() => {
        dispatch(AppAction.setRearrangeModalVisibility(true));
        dispatch(AppAction.setCurrentPage(pageList[0].order));
        dispatch(AppAction.setForceScroll(true));
      }}
      className="react__pdf-rearrange"
    >
      <ReactTooltip />
      <i data-tip="Rearrange Pages" className="far fa-copy pointer"></i>
    </div>
  );
}

export default Rearrange;
