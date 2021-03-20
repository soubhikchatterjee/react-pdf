import React from "react";

import Translate from "../../helpers/translate";

// Styles
import "./404.styles.scss";

function NotFound({ error }) {
  return (
    <div className="react__pdf--404">
      <h3>
        {Translate({
          id:
            "the_pdf_file_cannot_be_loaded_please_make_sure_the_url_exists_and_your_internet_is_up_and_running",
        })}
      </h3>

      {error && <code className="mt-20">{error}</code>}
    </div>
  );
}

export default NotFound;
