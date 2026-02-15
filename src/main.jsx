import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./context/AuthProvider.jsx";
import { RouterProvider } from "react-router";
import AOSProvider from "./context/AOSProvider.jsx";
import Routes from "./router/Routes.jsx";
import HeadContextProvider from "./context/HeadProviderContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AOSProvider>
        <HeadContextProvider>
          <RouterProvider router={Routes} />
        </HeadContextProvider>
      </AOSProvider>
    </AuthProvider>
  </StrictMode>
);