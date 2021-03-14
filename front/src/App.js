import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import { loadProgressBar } from "axios-progress-bar";

export default function App() {
  return (
    <BrowserRouter>
      {loadProgressBar()}
      <Routes />
      <ToastContainer />
    </BrowserRouter>
  );
}
