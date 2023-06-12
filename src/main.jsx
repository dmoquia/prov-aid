import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import JsonStateProvider from "./context/jsonState";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <JsonStateProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </JsonStateProvider> */}
  </React.StrictMode>
);
