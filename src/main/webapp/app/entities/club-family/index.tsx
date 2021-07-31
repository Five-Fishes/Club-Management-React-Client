import React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ClubFamily from './club-family';
import ClubFamilyDetail from './club-family-detail';

const Routes: React.FC<RouteComponentProps> = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ClubFamilyDetail} />
      <ErrorBoundaryRoute path={match.url} component={ClubFamily} />
    </Switch>
  </>
);

export default Routes;
