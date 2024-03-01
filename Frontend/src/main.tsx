import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { ToastContainer } from "react-toastify";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/md-light-indigo/theme.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <PrimeReactProvider value={{ pt: Tailwind }}>
      <ToastContainer />
      <App />
    </PrimeReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
