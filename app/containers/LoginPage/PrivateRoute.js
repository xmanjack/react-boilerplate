import { Route, Redirect } from 'react-router-dom';
import React from 'react';


const PrivateRoute = ({ component: Component, isAuthenticated, redirect, ...rest }) => (
  <Route {...rest} render={(props) => (
      isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
                    pathname: redirect,
                    state: { from: props.location }
                    }} />
  )} />
)


export default PrivateRoute;
