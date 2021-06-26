import React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Budget from './budget';
import BudgetDetail from './budget-detail';
import BudgetCreate from './budget-create';
import BudgetUpdate from './budget-update';
import BudgetDeleteDialog from './budget-delete-dialog';

const Routes: React.FC<RouteComponentProps> = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId/new`} component={BudgetCreate} />
      <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId/:id/edit`} component={BudgetUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/event/:eventId/:id`} component={BudgetDetail} />
      <ErrorBoundaryRoute path={`${match.url}/event/:eventId`} component={Budget} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/event/:eventId/:id/delete`} component={BudgetDeleteDialog} />
  </>
);

export default Routes;
