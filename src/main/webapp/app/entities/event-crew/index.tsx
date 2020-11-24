import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EventCrew from './event-crew';
import EventCrewDetail from './event-crew-detail';
import EventCrewUpdate from './event-crew-update';
import EventCrewDeleteDialog from './event-crew-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EventCrewUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EventCrewUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EventCrewDetail} />
      <ErrorBoundaryRoute path={match.url} component={EventCrew} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EventCrewDeleteDialog} />
  </>
);

export default Routes;
