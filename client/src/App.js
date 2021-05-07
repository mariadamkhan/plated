import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/global.scss";
import Profile from "./pages/Profile/Profile";
import RestoInfo from "./pages/RestoInfo/RestoInfo";
import Nav from "./components/Nav/Nav";

const Login = lazy(() => import("./pages/Login/Login"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Switch>
        {/* <Route path={'/'} component={Feed}></Route> */}
        <Route path={"/login"} exact component={Login}></Route>
        <Route path={"/signup"} exact component={SignUp}></Route>
        <>
          <Nav />
          <Switch>
            <Route path={"/profile"} exact component={Profile}></Route>
            <Route
              path={"/restaurants/:restNameKebab"}
              exact
              component={RestoInfo}
            ></Route>
          </Switch>
        </>
        {/* <Route path={'/bucket-list'} component={BucketList}></Route>
        <Route path={'/not-found'} component={NotFound404}></Route>
        <Route path={'*'}><Redirect to="not-found"/></Route> */}
      </Switch>
    </Suspense>
  );
}

export default App;
