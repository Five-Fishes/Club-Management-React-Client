import React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ClubFamily from './club-family';
import ClubFamilyDetail from './club-family-detail';
import ClubFamilyUpdate from './club-family-update';
import ClubFamilyDeleteDialog from './club-family-delete-dialog';
import FamilyMemberCreate from './family-member-create';

const Routes: React.FC<RouteComponentProps> = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ClubFamilyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ClubFamilyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ClubFamilyDetail} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/new`} component={FamilyMemberCreate} />
      <ErrorBoundaryRoute path={match.url} component={ClubFamily} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ClubFamilyDeleteDialog} />
  </>
);

export default Routes;
