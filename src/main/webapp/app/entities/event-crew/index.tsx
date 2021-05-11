import React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EventCrew from './event-crew';
import EventCrewDetail from './event-crew-detail';
import EventCrewUpdate from './event-crew-update';
import EventCrewDeleteDialog from './event-crew-delete-dialog';

const Routes: React.FC<RouteComponentProps> = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId/new`} component={EventCrewUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId/:id/edit`} component={EventCrewUpdate} />
      {/* <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId/:id`} component={EventCrewDetail} /> */}
      <ErrorBoundaryRoute path={`${match.url}/event/:eventId/`} component={EventCrew} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/event/:eventId/:id/delete`} component={EventCrewDeleteDialog} />
  </>
);

export default Routes;
