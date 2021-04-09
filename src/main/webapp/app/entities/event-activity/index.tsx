import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EventActivity from './event-activity';
import EventActivityDetail from './event-activity-detail';
import EventActivityUpdate from './event-activity-update';
import EventActivityCreate from './event-activity-create';
import EventActivityDeleteDialog from './event-activity-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId/new`} component={EventActivityCreate} />
      <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId/:id/edit`} component={EventActivityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId/:id`} component={EventActivityDetail} />
      <ErrorBoundaryRoute path={`${match.url}/event/:eventId`} component={EventActivity} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId/:id/delete`} component={EventActivityDeleteDialog} />
  </>
);

export default Routes;
