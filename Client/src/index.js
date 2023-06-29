import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
//import { createStore, applyMiddleware, compose } from "redux";
//import thunk from "redux-thunk";
//import AuthProvider from "./context/AuthProvider";
//import {reducers} from "./reducers"
import store from "./redux/store";
//const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
