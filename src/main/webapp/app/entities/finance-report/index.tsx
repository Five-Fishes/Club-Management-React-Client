import React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import FinanceReport from 'app/entities/finance-report/finance-report';
import AppRoute from 'app/shared/auth/app-route';

const Routes: React.FC<RouteComponentProps> = ({ match }) => (
  <>
    <Switch>
      <AppRoute path={match.url} component={FinanceReport} />
    </Switch>
  </>
);

export default Routes;
