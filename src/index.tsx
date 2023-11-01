import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./contexts/AuthContext";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <SnackbarProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
