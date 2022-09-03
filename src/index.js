import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PopUpDataProvider from "./context/PopUp/PopUpDataHandler";
import RoomsDataProvider from "./context/RoomsDataHandler";

import "./css/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RoomsDataProvider>
    <PopUpDataProvider>
      <App />
    </PopUpDataProvider>
  </RoomsDataProvider>
);
