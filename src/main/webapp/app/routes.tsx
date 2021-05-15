import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Home from 'app/modules/home/home';
import Entities from 'app/entities';
import AppRoute from 'app/shared/auth/app-route';
import PageNotFound from 'app/shared/error/page-not-found';
import AuthLogin from 'app/modules/auth/login/auth-login';
import AuthEmailLogin from 'app/modules/auth/email-login/auth-email-login';
import AuthEmailRegister from './modules/auth/email-register/auth-email-register';
import AuthEmailReset from './modules/auth/email-reset/auth-email-reset';
import UserProfile from './modules/user-profile/user-profile';
import CCRole from './shared/model/enum/cc-role.enum';
import CompleteUserProfile from './modules/auth/complete-profile/complete-user-profile';

// tslint:disable:space-in-parens

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>,
});
// tslint:enable

const Routes = () => (
  <div className="h-100">
    <Switch>
      <AppRoute exact path="/" component={Home} isPublic />
      <AppRoute exact path="/auth/login" component={AuthLogin} isPublic />
      <AppRoute exact path="/auth/email/login" component={AuthEmailLogin} isPublic />
      <AppRoute exact path="/auth/email/register" component={AuthEmailRegister} isPublic />
      <AppRoute exact path="/auth/email/reset" component={AuthEmailReset} isPublic />
      <AppRoute exact path="/profile" component={UserProfile} asLongAsIsAuthenticated />
      <AppRoute exact path="/profile/complete" component={CompleteUserProfile} asLongAsIsAuthenticated />
      <AppRoute path="/entity" component={Entities} isPublic />
      <AppRoute path="/admin" component={Admin} ccRole={CCRole.ADMIN} />
      <AppRoute component={PageNotFound} isPublic />
    </Switch>
  </div>
);

export default Routes;
