import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseProvider from "./provider/FirebaseProvider";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  // TODO: remove context

  <React.StrictMode>
    <Router>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </Router>
  </React.StrictMode>,

  document.getElementById("root")
);
