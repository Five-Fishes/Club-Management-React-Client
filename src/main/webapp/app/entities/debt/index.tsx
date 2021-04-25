import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Debt from './debt';
import DebtDetail from './debt-detail';
import DebtUpdate from './debt-update';
import DebtBadDebtDialog from './debt-bad-debt-dialog';
import DebtCollectDialog from './debt-collect-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DebtUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DebtUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DebtDetail} />
      <ErrorBoundaryRoute path={match.url} component={Debt} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/collect`} component={DebtCollectDialog} />
    <ErrorBoundaryRoute path={`${match.url}/:id/badDebt`} component={DebtBadDebtDialog} />
  </>
);

export default Routes;
