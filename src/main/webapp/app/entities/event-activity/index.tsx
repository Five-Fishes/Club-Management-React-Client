import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EventActivity from './event-activity';
import EventActivityDetail from './event-activity-detail';
import EventActivityUpdate from './event-activity-update';
import EventActivityDeleteDialog from './event-activity-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EventActivityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EventActivityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EventActivityDetail} />
      <ErrorBoundaryRoute path={match.url} component={EventActivity} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EventActivityDeleteDialog} />
  </>
);

export default Routes;
