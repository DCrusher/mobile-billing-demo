import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import SignIn from './components/SignIn/SignIn.jsx';
import UserCabinet from './components/UserCabinet/UserCabinet.jsx';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <PrivateRoute path="/" component={UserCabinet} />
    </Switch>
  </Router>
);

export default AppRouter;