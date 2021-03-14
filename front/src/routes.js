import React from "react";
import { isAuthenticated } from "./services/auth";
import { Switch, Route, Redirect } from "react-router";
import Login from "./pages/login/Login";
import Config from "./pages/config/Config";
import Shopping from "./pages/shopping/Shopping";
import News from "./pages/news/News";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/shopping" component={Shopping} />
    <Route exact path="/news" component={News} />
    <PrivateRoute exact path="/config" component={Config} />
    <Route exact path="/">
      <Redirect to="/shopping" />
    </Route>
    <Route path="*">
      <Redirect to="/shopping" />
    </Route>
  </Switch>
);
