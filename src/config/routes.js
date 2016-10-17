import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../containers/App';
import Main from '../containers/Main';
import Login from '../components/Login';
import Logout from '../components/Logout';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={ App }>
      <IndexRoute component={ Main } />
      <Route path='/login' component={ Login } />
      <Route path='/logout' component={ Logout } />
    </Route>
  </Router>
);
