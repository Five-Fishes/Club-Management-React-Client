import React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EventChecklist from './event-checklist';
import EventChecklistDetail from './event-checklist-detail';
import EventChecklistUpdate from './event-checklist-update';
import EventChecklistDeleteDialog from './event-checklist-delete-dialog';

const Routes: React.FC<RouteComponentProps> = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId/new`} component={EventChecklistUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId/:id/edit`} component={EventChecklistUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId/:id`} component={EventChecklistDetail} />
      <ErrorBoundaryRoute path={`${match.url}/event/:eventId`} component={EventChecklist} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/event/:eventId/:id/delete`} component={EventChecklistDeleteDialog} />
  </>
);

export default Routes;
