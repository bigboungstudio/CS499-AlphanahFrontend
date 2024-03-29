import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ScrollToTop from "./scrollToTop";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const root = ReactDOM.createRoot(document.getElementById("root"));
const stripePromise = loadStripe(
  "pk_test_51MFAyZLQdLiEuIyigC5CZkevTCs6l7qYPYFmVc8wpEVfuTjLbAnp11zeFcoUt6C4CqYqF5cuEKAkK4dsVb1FBkcW00qkviZaFS"
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Elements stripe={stripePromise}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <ScrollToTop />
              <App />
            </Router>
          </PersistGate>
        </ReduxProvider>
      </Elements>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
