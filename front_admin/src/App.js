import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import "react-notifications/lib/notifications.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import "./assets/fonts/fonts.css";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes />
      <ToastContainer />
    </BrowserRouter>
  );
}
