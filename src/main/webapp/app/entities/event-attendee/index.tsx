import React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EventAttendee from './event-attendee';
import EventAttendeeUpdate from './event-attendee-create';

const Routes: React.FC<RouteComponentProps> = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId/new`} component={EventAttendeeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId`} component={EventAttendee} />
    </Switch>
  </>
);

export default Routes;
