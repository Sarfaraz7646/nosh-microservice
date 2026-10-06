import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
import { useAuthStore } from "./store/authStore";

function Root() {
  const hydrate = useAuthStore((s) => s.hydrate);
  React.useEffect(() => {
    hydrate();
  }, [hydrate]);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
