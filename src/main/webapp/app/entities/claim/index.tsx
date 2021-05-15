import React from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Claim from './claim';
import ClaimDetail from './claim-detail';
import ClaimUpdate from './claim-update';
import ClaimDeleteDialog from './claim-delete-dialog';

const Routes: React.FC<RouteComponentProps> = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ClaimUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ClaimUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ClaimDetail} />
      <ErrorBoundaryRoute path={match.url} component={Claim} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ClaimDeleteDialog} />
  </>
);

export default Routes;
