import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { WishlistProvider } from "./context/WishlistProvider";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <WishlistProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WishlistProvider>
);
