import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ReposProvider } from "./hooks/useRepos";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReposProvider>
        <App />
      </ReposProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
