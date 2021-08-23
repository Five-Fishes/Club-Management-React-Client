import React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ClubFamily from './club-family';
import ClubFamilyDetail from './club-family-detail';
import FamilyMemberCreate from './family-member-create';
import FamilyMember from './family-member';

const Routes: React.FC<RouteComponentProps> = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FamilyMember} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/new`} component={FamilyMemberCreate} />
      <ErrorBoundaryRoute path={match.url} component={ClubFamily} />
    </Switch>
  </>
);

export default Routes;
