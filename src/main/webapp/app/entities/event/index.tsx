import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Event from './event';
import EventDetail from './event-detail';
import EventUpdate from './event-update';
import EventDeleteDialog from './event-delete-dialog';
import EventAttendeeDeleteDialog from '../event-attendee/event-attendee-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EventUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EventUpdate} />
      <ErrorBoundaryRoute path={`${match.url}/:id`} component={EventDetail} />
      <ErrorBoundaryRoute exact path={match.url} component={Event} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EventDeleteDialog} />
    <ErrorBoundaryRoute path={`${match.url}/:id/eventAttendee/:attendeeId/delete`} component={EventAttendeeDeleteDialog} />
  </>
);

export default Routes;
