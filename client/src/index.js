import "./index.css";
// import "antd/dist/antd.css";

import * as React from "react";
import * as ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import promiseMiddleware from "redux-promise";
import { thunk } from "redux-thunk";

import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import reducers from "./_reducers";

const creatStoreWithMiddleware = configureStore({
  reducer: reducers,
  middleware: () => {
    return [thunk, promiseMiddleware];
  },
  devTools: true,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    // <BrowserRouter>
      <Provider store={creatStoreWithMiddleware}>
        <App />
      </Provider>
    // </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
