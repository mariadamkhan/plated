import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import './styles/global.scss';
import Profile from './pages/Profile/Profile';
import RestoInfo from "./pages/RestoInfo/RestoInfo";


const Login = lazy(() => import ('./pages/Login/Login'));
const SignUp = lazy(() => import ('./pages/SignUp/SignUp'));


function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
      <Switch>
        {/* <Route path={'/'} component={Feed}></Route> */}
        <Route path={'/login'} component={Login}></Route>
        <Route path={'/signup'} component={SignUp}></Route>
        <Route path={'/profile'} component={Profile}></Route>
        <Route path={'/:restoId'} component={RestoInfo}></Route>
        {/* <Route path={'/bucket-list'} component={BucketList}></Route>
        <Route path={'/not-found'} component={NotFound404}></Route>
        <Route path={'*'}><Redirect to="not-found"/></Route> */}

      </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
