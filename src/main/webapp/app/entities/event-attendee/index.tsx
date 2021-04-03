import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EventAttendee from './event-attendee';

const Routes = ({ match }) => (
  <>
    <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId`} component={EventAttendee} />
  </>
);

export default Routes;
