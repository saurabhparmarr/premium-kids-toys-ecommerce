import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

import App from "./App.jsx";
import { store } from "./app/store.js";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <Provider store={store}>
      <App />
      // App.jsx ya jahan Toaster rakha hai
<Toaster 
  position="bottom-center" 
  toastOptions={{
    duration: 3000,
    style: {
      marginBottom: '20px', // Page ke niche rahega, button se door
    },
  }} 
/>
    </Provider>
  </HelmetProvider>,
);
