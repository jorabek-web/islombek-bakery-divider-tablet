import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./integration/store.ts";

// if (
//   "serviceWorker" in navigator &&
//   !window.location.hostname.includes("localhost")
// ) {
//   navigator.serviceWorker.register("/sw.js");
// }

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
