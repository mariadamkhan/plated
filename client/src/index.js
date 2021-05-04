import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseProvider from "./provider/FirebaseProvider";

ReactDOM.render(
  // TODO: remove context
  <React.StrictMode>
  <FirebaseProvider>
    <App />
  </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
