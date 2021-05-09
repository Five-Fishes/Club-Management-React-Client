import React from 'react';
import { Switch } from 'react-router-dom';

import UserProfile from './user-profile';
import AppRoute from 'app/shared/auth/app-route';

const Routes = ({ match }) => (
  <>
    <Switch>
      <AppRoute path={`${match.url}`} component={UserProfile} asLongAsIsAuthenticated />
    </Switch>
  </>
);

export default Routes;
