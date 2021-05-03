import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as CONSTANTS from './constants/Constants';
import './styles/global.scss';

const Login = lazy(() => import ('./pages/Login/Login'));
const SignUp = lazy(() => import ('./pages/SignUp/SignUp'));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
      <Switch>
        <Route path={CONSTANTS.LOGIN} component={Login}></Route>
        <Route path={CONSTANTS.SIGN_UP} component={SignUp}></Route>
      </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
