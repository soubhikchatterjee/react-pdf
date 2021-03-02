import React from "react";

function RearrangeItem({ page, order, onDragStart, onDrop }) {
  return (
    <div
      key={page}
      draggable={true}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={e => e.preventDefault()}
      item-id={order}
      className="react__pdf--rearrange-modal-box-body-item mb-10"
    >
      <i
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
        item-id={order}
        className="fas fa-bars"
      ></i>
      <div
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
        item-id={order}
        className="react__pdf--rearrange-modal-box-body-item-label"
      >
        Page {page}
      </div>
      <div></div>
    </div>
  );
}

export default RearrangeItem;
