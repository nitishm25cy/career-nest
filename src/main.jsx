
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { registerSW } from "virtual:pwa-register";
import "./index.css";

import App from "./App.jsx";

import { store } from "./store/store";
import { JobProvider } from "./context/JobContext";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
registerSW({ immediate: true });
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <AuthProvider>
          <JobProvider>
            <App />
          </JobProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
