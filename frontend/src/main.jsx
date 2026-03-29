import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/react";
import { BrowserRouter } from "react-router";

const PUBLISHABLE_HEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_HEY) {
  throw new Error(
    "Missing publishable key. Please set the VITE_CLERK_PUBLISHABLE_KEY environment variable.",
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_HEY}>
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
);
