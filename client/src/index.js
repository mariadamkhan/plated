import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseProvider from "./provider/FirebaseProvider";

ReactDOM.render(
  // TODO: remove context
  <FirebaseProvider>
    <App />
  </FirebaseProvider>,
  document.getElementById("root")
);
