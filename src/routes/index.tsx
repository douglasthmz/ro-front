import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import AdminPage from '../pages/AdminPanel';
import Report from '../pages/Report';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/adminpage" component={AdminPage} isPrivate />
    <Route path="/report/:id" component={Report} isPrivate />
  </Switch>
);

export default Routes;
