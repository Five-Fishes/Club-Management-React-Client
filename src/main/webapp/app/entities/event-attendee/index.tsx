import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EventAttendee from './event-attendee';
import EventAttendeeDetail from './event-attendee-detail';
import EventAttendeeUpdate from './event-attendee-update';
import EventAttendeeDeleteDialog from './event-attendee-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EventAttendeeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EventAttendeeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EventAttendeeDetail} />
      <ErrorBoundaryRoute path={match.url} component={EventAttendee} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EventAttendeeDeleteDialog} />
  </>
);

export default Routes;
