import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./Pages/themeProvider";
import { Toaster } from "react-hot-toast";
import { MantineProvider } from "@mantine/core";
import { ToastProvider } from "./toastMessages/toastContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>

      <Toaster position="top-center" reverseOrder={false} />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: "light" }} 
      >
        <App />
      </MantineProvider>
      </ToastProvider>

    </ThemeProvider>
  </StrictMode>,
);
