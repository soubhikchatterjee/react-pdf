import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";

// Custom components
import * as AppAction from "store/actions/app.action";
import Button from "components/button/button.component";

// Styles
import "./rotate.styles.scss";

function Rotate() {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    state => state.appReducer[AppAction.PDF_CURRENT_PAGE]
  );

  const rotateLeftMenu = [
    {
      label: "Rotate Selected Page",
      onClick: () =>
        dispatch(
          AppAction.setRotateCurrentPage({ currentPage, direction: "LEFT" })
        )
    },
    {
      label: "Rotate All Pages",
      onClick: () => dispatch(AppAction.setRotateAllPages("LEFT"))
    }
  ];

  const rotateRightMenu = [
    {
      label: "Rotate Selected Page",
      onClick: () => {
        dispatch(
          AppAction.setRotateCurrentPage({ currentPage, direction: "RIGHT" })
        );
      }
    },
    {
      label: "Rotate All Pages",
      onClick: () => dispatch(AppAction.setRotateAllPages("RIGHT"))
    }
  ];

  return (
    <div className="react__pdf--rotate">
      <ReactTooltip />
      <Button
        menu={rotateLeftMenu}
        defaultClick={() => {
          dispatch(
            AppAction.setRotateCurrentPage({ currentPage, direction: "LEFT" })
          );
        }}
        tooltip="Rotate Left"
        wrapperClassname="mr-20"
        iconClassname="fas fa-undo-alt pointer"
      />
      <Button
        menu={rotateRightMenu}
        defaultClick={() => {
          dispatch(
            AppAction.setRotateCurrentPage({ currentPage, direction: "RIGHT" })
          );
        }}
        tooltip="Rotate Right"
        iconClassname="fas fa-redo-alt pointer"
      />
    </div>
  );
}

export default Rotate;
