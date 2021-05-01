import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as CONSTANTS from './constants/Constants';

const Login = lazy(() => import ('./pages/Login'));
function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
      <Switch>
        <Route path={CONSTANTS.LOGIN} component={Login}></Route>
      </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
