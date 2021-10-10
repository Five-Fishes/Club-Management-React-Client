import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';
import Member from './member';

const Routes: React.FC<RouteComponentProps> = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={match.url} component={Member} />
    </Switch>
  </>
);

export default Routes;
