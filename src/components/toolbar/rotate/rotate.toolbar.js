import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";

// Custom components
import * as AppAction from "../../../store/actions/app.action";
import Button from "../../../components/button/button.component";
import Translate from "../../../helpers/translate";

// Styles
import "./rotate.styles.scss";

function Rotate() {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state) => state.appReducer[AppAction.PDF_CURRENT_PAGE]
  );

  const rotateRightMenu = [
    {
      label: Translate({
        id: "rotate_selected_page",
      }),
      onClick: () => {
        dispatch(
          AppAction.setRotateCurrentPage({ currentPage, direction: "RIGHT" })
        );
      },
    },
    {
      label: Translate({
        id: "rotate_all_pages",
      }),
      onClick: () => dispatch(AppAction.setRotateAllPages("RIGHT")),
    },
  ];

  return (
    <div className="react__pdf--rotate">
      <ReactTooltip />
      <Button
        menu={rotateRightMenu}
        defaultClick={() => {
          dispatch(
            AppAction.setRotateCurrentPage({ currentPage, direction: "RIGHT" })
          );
        }}
        tooltip={Translate({
          id: "rotate_right",
        })}
        iconClassname="fas fa-redo-alt pointer"
      />
    </div>
  );
}

export default Rotate;
