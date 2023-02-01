import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <PayPalScriptProvider
      options={{
        "client-id":
          "ARi_irObOqIOM7d7D2vth3Qn2LXwQ89pFGeOiSpAoxy6pX0Tlrv_1VoXy2kaaRQ2IKWAMoA88oQmXWpy",
      }}
    >
      <App />
    </PayPalScriptProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
