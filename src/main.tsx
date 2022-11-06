import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { AppContainer } from "./containers/AppContainer";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
);
