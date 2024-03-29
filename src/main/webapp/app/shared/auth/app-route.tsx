import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { Location, LocationDescriptor } from 'history';
import { Translate } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import ErrorBoundary from 'app/shared/error/error-boundary';
import AuthorizationChecker, { IAuthorizationCheckerOwnProps } from 'app/shared/components/authorization-checker/authorization-checker';

const UnauthorizedBanner: React.ReactElement = (
  <div className="insufficient-authority">
    <div className="alert alert-danger">
      <Translate contentKey="error.http.403">You are not authorized to access this page.</Translate>
    </div>
  </div>
);

export interface IRedirectLocationState {
  from?: Location;
  value?: string;
}

interface IAppRouteOwnProps extends RouteProps, IAuthorizationCheckerOwnProps {}

export interface IAppRouteProps extends IAppRouteOwnProps, StateProps {}

const AppRouteComponent: React.FC<IAppRouteProps> = (props: IAppRouteProps) => {
  const { component: Component, isAuthenticated, isProfileCompleted, isPublic, location } = props;
  const toLocation: LocationDescriptor<IRedirectLocationState> = {
    search: props.location?.search,
    state: { from: props.location },
  };
  if (!isPublic && !isAuthenticated) {
    return (
      <Redirect
        to={{
          ...toLocation,
          pathname: '/auth/login',
        }}
      />
    );
  }
  const isCompleteProfilePage: boolean = location?.pathname === '/profile/complete';
  if (!isPublic && !isProfileCompleted && !isCompleteProfilePage) {
    return (
      <Redirect
        to={{
          ...toLocation,
          pathname: '/profile/complete',
        }}
      />
    );
  }
  function renderFunc(routeProps: RouteComponentProps<any>): React.ReactNode {
    if (!Component) throw new Error(`Missing Component in private route: ${props.path}`);
    return (
      <AuthorizationChecker {...props} fallbackEl={props.fallbackEl || UnauthorizedBanner}>
        <ErrorBoundary>
          <Component {...routeProps} />
        </ErrorBoundary>
      </AuthorizationChecker>
    );
  }
  return <Route {...props} render={renderFunc} />;
};

function mapStateToProps({ authentication }: IRootState) {
  const { isAuthenticated, isProfileCompleted } = authentication;
  return {
    isAuthenticated,
    isProfileCompleted,
  };
}

type StateProps = ReturnType<typeof mapStateToProps>;

const AppRoute = connect<StateProps, undefined, IAppRouteOwnProps, IRootState>(mapStateToProps, null, null, { pure: false })(
  AppRouteComponent
);

export default AppRoute;
