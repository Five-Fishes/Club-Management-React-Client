import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EventAttendee from './event-attendee';
import EventAttendeeDetail from './event-attendee-detail';
import EventAttendeeUpdate from './event-attendee-create';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId/new`} component={EventAttendeeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EventAttendeeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EventAttendeeDetail} />
      <ErrorBoundaryRoute path={match.url} component={EventAttendee} />
    </Switch>
  </>
);

export default Routes;
