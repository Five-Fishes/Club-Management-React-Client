import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Debt from './debt';
import DebtDetail from './debt-detail';
import DebtUpdate from './debt-update';
import DebtDeleteDialog from './debt-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DebtUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DebtUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DebtDetail} />
      <ErrorBoundaryRoute path={match.url} component={Debt} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DebtDeleteDialog} />
  </>
);

export default Routes;
