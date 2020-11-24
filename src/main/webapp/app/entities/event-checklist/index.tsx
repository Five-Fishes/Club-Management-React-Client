import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EventChecklist from './event-checklist';
import EventChecklistDetail from './event-checklist-detail';
import EventChecklistUpdate from './event-checklist-update';
import EventChecklistDeleteDialog from './event-checklist-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EventChecklistUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EventChecklistUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EventChecklistDetail} />
      <ErrorBoundaryRoute path={match.url} component={EventChecklist} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EventChecklistDeleteDialog} />
  </>
);

export default Routes;
