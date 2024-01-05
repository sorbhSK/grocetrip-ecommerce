import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/reducer.js";
// import store from "./Store/Store.js";


const store = configureStore({
  reducer: {
    user: userReducer,
  },
});


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
