import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.js";
import {Routes} from "./routes/index.jsx"


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </StrictMode>
);
