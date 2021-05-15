import React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import UserProfile from './user-profile';
import AppRoute from 'app/shared/auth/app-route';
import UserProfileUpdate from './user-profile-update';

const Routes: React.FC<RouteComponentProps> = ({ match }) => (
  <>
    <Switch>
      <AppRoute exact path={`${match.url}/update`} component={UserProfileUpdate} asLongAsIsAuthenticated />
      <AppRoute path={`${match.url}`} component={UserProfile} asLongAsIsAuthenticated />
    </Switch>
  </>
);

export default Routes;
