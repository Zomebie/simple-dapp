import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { setWalletProvider } from "./api/wallet";
import { AdenaProvider } from "./providers/adena";
import App from "./App";

setWalletProvider(new AdenaProvider());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
