import React from "react";

// Styles
import "./thumbnail.styles.scss";

function Thumbnail({ page = 1, classes = "" }) {
  return (
    <div className={`react__pdf--thumbnail ${classes}`}>
      <img
        className="pointer"
        alt="Page 1"
        src="https://customercare.igloosoftware.com/.api2/binaries/oenijpSZ8I/thumbnails/whatisit1.png?width=600"
      />

      <div className="react__pdf--thumbnail-page-number">Page {page}</div>
    </div>
  );
}

export default Thumbnail;
