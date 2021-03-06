import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";

// Custom Components
import * as AppAction from "../../store/actions/app.action";
import RearrangeItem from "./rearrange-item.component";
import Translate from "../../helpers/translate";

// Styles
import "./rearrange.styles.scss";

function Rearrange() {
  const dispatch = useDispatch();
  const [startPage, setStartPage] = useState(null);
  const [items, setItems] = useState([]);
  const pageList = useSelector(
    (state) => state.appReducer[AppAction.PAGE_LIST]
  );

  // Load the pagelist to the local state the first time.
  useEffect(() => {
    if (pageList) {
      setItems(pageList);
    }
  }, [pageList]);

  const rearrangePages = (endPage) => {
    const newItems = [...items];
    for (const item of newItems) {
      if (item.order === startPage) {
        item.order = endPage;
      } else if (item.order === endPage) {
        item.order = startPage;
      }
    }

    const sortedItems = newItems.sort((a, b) => a.order - b.order);
    setItems(sortedItems);
    dispatch(AppAction.setChangesSaved(false));
  };

  const onSave = () => {
    dispatch(AppAction.setChangeId());
    dispatch(AppAction.setPageList(items));
    dispatch(AppAction.setRearrangeModalVisibility(false));
  };

  const onCancel = () => {
    dispatch(AppAction.setRearrangeModalVisibility(false));
  };

  return (
    <div className="react__pdf--rearrange-modal">
      <ReactTooltip />
      <div className="react__pdf--rearrange-modal-backdrop"></div>
      <div className="react__pdf--rearrange-modal-box">
        {/* Title */}
        <div className="react__pdf--rearrange-modal-box-title mb-20">
          <div></div>
          <h2 className="react__pdf--rearrange-modal-box-title-heading">
            {Translate({
              id: "rearrange_pages",
            })}
          </h2>
          <div>
            <i
              onClick={onSave}
              data-tip={Translate({
                id: "save_changes",
              })}
              className="fas fa-save react__pdf--rearrange-modal-box-title-icon pointer mr-10"
            ></i>
            <i
              onClick={onCancel}
              data-tip={Translate({
                id: "cancel_changes_and_close",
              })}
              className="fas fa-times react__pdf--rearrange-modal-box-title-icon pointer"
            ></i>
          </div>
        </div>

        {/* Body */}
        <div className="react__pdf--rearrange-modal-box-body">
          {items &&
            items.map((item) => (
              <RearrangeItem
                key={item.pageNumber}
                page={item.pageNumber}
                order={item.order}
                onDragStart={(e) => {
                  setStartPage(+e.target.getAttribute("item-id"));
                }}
                onDrop={(e) => {
                  rearrangePages(+e.target.getAttribute("item-id"));
                }}
              />
            ))}
          <div className="mt-5">&nbsp;</div>
        </div>
      </div>
    </div>
  );
}

export default Rearrange;
