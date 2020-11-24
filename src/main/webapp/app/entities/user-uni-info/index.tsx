import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserUniInfo from './user-uni-info';
import UserUniInfoDetail from './user-uni-info-detail';
import UserUniInfoUpdate from './user-uni-info-update';
import UserUniInfoDeleteDialog from './user-uni-info-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserUniInfoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserUniInfoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserUniInfoDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserUniInfo} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UserUniInfoDeleteDialog} />
  </>
);

export default Routes;
