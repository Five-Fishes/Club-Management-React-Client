import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Home from 'app/modules/home/home';
import Entities from 'app/entities';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';
import AuthLogin from 'app/modules/auth/login/auth-login';
import AuthEmailLogin from 'app/modules/auth/email-login/auth-email-login';
import AuthEmailRegister from './modules/auth/email-register/auth-email-register';
import AuthEmailReset from './modules/auth/email-reset/auth-email-reset';
import UserProfile from './modules/user-profile/user-profile';
import EventDetails from 'app/entities/event/event-detail';

// tslint:disable:space-in-parens

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>
});
// tslint:enable

const Routes = () => (
  <div className="h-100">
    <Switch>
      <ErrorBoundaryRoute exact path="/auth/login" component={AuthLogin} />
      <ErrorBoundaryRoute exact path="/auth/email/login" component={AuthEmailLogin} />
      <ErrorBoundaryRoute exact path="/auth/email/register" component={AuthEmailRegister} />
      <ErrorBoundaryRoute exact path="/auth/email/reset" component={AuthEmailReset} />
      <ErrorBoundaryRoute path="/events/:id/details" component={EventDetails} />
      <PrivateRoute exact path="/profile" component={UserProfile} />
      <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path="/entity" component={Entities} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <ErrorBoundaryRoute path="/" exact component={Home} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
