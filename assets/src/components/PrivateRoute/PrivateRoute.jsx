import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
 
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const isAuthenticated = !!auth.jwt.token;

  return (
    <Route {...rest} render={(props) => (
      isAuthenticated ? <Component {...props} /> : <Redirect to='/signin' />
    )} />
  );
}

export default inject("auth")(observer(PrivateRoute))