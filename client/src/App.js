import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./styles/global.scss";
import Profile from "./pages/Profile/Profile";
import RestoInfo from "./pages/RestoInfo/RestoInfo";
import Nav from "./components/Nav/Nav";
import Upload from "./pages/Upload/Upload";
import BucketList from "./pages/BucketList/BucketList";
import Feed from "./pages/Feed/Feed";

const Login = lazy(() => import("./pages/Login/Login"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Switch>
        {/* <Route path={'/'} component={Feed}></Route> */}
        <Route path={"/"} exact component={Login}></Route>
        <Route path={"/signup"} exact component={SignUp}></Route>
        <>
          <Nav />
          <Switch>
            <Route path={"/feed"} exact component={Feed}></Route>
            <Route path={"/profile"} exact component={Profile}></Route>
            <Route
              path={"/restaurants/:restoNameKebab"}
              exact
              component={RestoInfo}
            ></Route>
            <Route path={"/upload"} exact component={Upload}></Route>
            <Route path={"/bucket-list"} exact component={BucketList}></Route>
          </Switch>
        </>
        {/* 
        <Route path={'/not-found'} component={NotFound404}></Route>
        <Route path={'*'}><Redirect to="not-found"/></Route> */}
      </Switch>
    </Suspense>
  );
}

export default App;
