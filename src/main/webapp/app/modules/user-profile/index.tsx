import React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import UserProfile from './user-profile';
import AppRoute from 'app/shared/auth/app-route';
import UserProfileUpdate from './user-profile-update';
import CompleteUserProfile from './complete-user-profile';

const Routes: React.FC<RouteComponentProps> = ({ match }) => (
  <>
    <Switch>
      <AppRoute exact path={`${match.url}/update`} component={UserProfileUpdate} asLongAsIsAuthenticated />
      <AppRoute exact path={`${match.url}/complete`} component={CompleteUserProfile} asLongAsIsAuthenticated />
      <AppRoute path={`${match.url}`} component={UserProfile} asLongAsIsAuthenticated />
    </Switch>
  </>
);

export default Routes;
