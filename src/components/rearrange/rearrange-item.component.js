import React from "react";

import Translate from "../../helpers/translate";

function RearrangeItem({ page, order, onDragStart, onDrop }) {
  return (
    <div
      key={page}
      draggable={true}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      item-id={order}
      className="react__pdf--rearrange-modal-box-body-item mb-10"
    >
      <i
        onDragOver={(e) => e.preventDefault()}
        item-id={order}
        className="fas fa-bars"
      ></i>
      <div
        onDragOver={(e) => e.preventDefault()}
        item-id={order}
        className="react__pdf--rearrange-modal-box-body-item-label"
      >
        {Translate({
          id: "page",
        })}{" "}
        {page}
      </div>
      <div></div>
    </div>
  );
}

export default RearrangeItem;
