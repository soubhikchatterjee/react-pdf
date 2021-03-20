import React from "react";
import { useSelector, useDispatch } from "react-redux";

// Custom components
import * as AppAction from "../../../store/actions/app.action";

// Styles
import "./navigation.styles.scss";

function Navigation() {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    state => state.appReducer[AppAction.PDF_CURRENT_PAGE]
  );
  const totalPages = useSelector(
    state => state.appReducer[AppAction.PDF_TOTAL_PAGES]
  );

  return (
    <div className="react__pdf--navigation">
      <i
        className="fas fa-caret-left pointer"
        onClick={() => {
          let currentPageNumber = currentPage;
          currentPageNumber--;
          if (currentPageNumber < 1) {
            currentPageNumber = 1;
          }

          dispatch(AppAction.setForceScroll(true));
          dispatch(AppAction.setCurrentPage(currentPageNumber));
        }}
      ></i>
      <div className="react__pdf--navigation-digits react__pdf--navigation-current-page">
        {currentPage || "..."}
      </div>
      <div className="react__pdf--navigation-divider">/</div>
      <div className="react__pdf--navigation-digits react__pdf--navigation-total-pages">
        {totalPages || "..."}
      </div>
      <i
        className="fas fa-caret-right pointer"
        onClick={() => {
          let currentPageNumber = currentPage;
          currentPageNumber++;
          if (currentPageNumber > totalPages) {
            currentPageNumber = totalPages;
          }

          dispatch(AppAction.setForceScroll(true));
          dispatch(AppAction.setCurrentPage(currentPageNumber));
        }}
      ></i>
    </div>
  );
}

export default Navigation;
