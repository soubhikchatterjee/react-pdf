import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "store/store";
import reportWebVitals from "./reportWebVitals";

// Styles
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="outer-app">
        <App />
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(console.info);
