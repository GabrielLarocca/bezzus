import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { isAuthenticated } from "./service/auth";
import Login from "./pages/auth/Login";
import Clientes from "./pages/Clientes/Clientes";
import Produtos from "./pages/Produtos/Produtos";

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

export default (props) => (
  <Switch>
    <PrivateRoute exact path="/clientes" component={Clientes} />
    <PrivateRoute exact path="/produtos" component={Produtos} />
    <Route path="/login" component={Login} />
    <PrivateRoute exact path="/">
      <Redirect to="/produtos" />
    </PrivateRoute>
  </Switch>
);
