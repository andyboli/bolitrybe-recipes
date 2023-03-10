import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "./context";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
