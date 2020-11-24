import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserCCInfo from './user-cc-info';
import UserCCInfoDetail from './user-cc-info-detail';
import UserCCInfoUpdate from './user-cc-info-update';
import UserCCInfoDeleteDialog from './user-cc-info-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserCCInfoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserCCInfoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserCCInfoDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserCCInfo} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UserCCInfoDeleteDialog} />
  </>
);

export default Routes;
