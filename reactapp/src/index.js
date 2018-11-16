// Dependencies
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
// Middleware
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
// Reducers
import rootReducer from "./reducers";
// Components
import { App } from "./components";
import { CookiesProvider } from "react-cookie";

import "bootstrap/dist/css/bootstrap.min.css";
// Styles
import "./index.css";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
