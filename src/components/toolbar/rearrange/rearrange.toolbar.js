import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";

// Custom components
import * as AppAction from "store/actions/app.action";

// Styles
import "./rearrange.styles.scss";

function Rearrange() {
  const dispatch = useDispatch();
  const isVisible = useSelector(
    state => state.appReducer[AppAction.REARRANGE_MODAL_VISIBILITY]
  );

  return (
    <div
      onClick={() => {
        dispatch(AppAction.setRearrangeModalVisibility(!isVisible));
        dispatch(AppAction.setCurrentPage(1));
      }}
      className="react__pdf-rearrange"
    >
      <ReactTooltip />
      <i data-tip="Rearrange Pages" className="far fa-copy pointer"></i>
    </div>
  );
}

export default Rearrange;
