import React from "react";

// Styles
import "./404.styles.scss";

function NotFound({ error }) {
  return (
    <div className="react__pdf--404">
      <h3>
        The PDF file cannot be loaded. Please make sure the url exists and your
        internet is up and running.
      </h3>

      {error && <code className="mt-20">{error}</code>}
    </div>
  );
}

export default NotFound;
