import React from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";

// Custom components
import * as AppAction from "store/actions/app.action";
import Thumbnail from "components/thumbnail/thumbnail.component";

// Styles
import "./drawer.styles.scss";

function Drawer() {
  const dispatch = useDispatch();
  const showDrawer = useSelector(
    state => state.appReducer[AppAction.DRAWER_VISIBILITY]
  );
  return (
    <div
      className={classnames("react__pdf--drawer", {
        "react__pdf--drawer-open": showDrawer,
        "react__pdf--drawer-close": !showDrawer
      })}
    >
      <i
        className="fas fa-times react__pdf--drawer-close-button pointer"
        onClick={() => dispatch(AppAction.setDrawerVisibility(false))}
      ></i>
      <div className="clear-fix"></div>
      <div className="react__pdf--drawer-thumbnails">
        {[
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20
        ].map((item, idx) => (
          <Thumbnail key={idx} classes="mb-50" page={idx + 1} />
        ))}
      </div>
      <div className="mb-40"></div>
    </div>
  );
}

export default Drawer;
