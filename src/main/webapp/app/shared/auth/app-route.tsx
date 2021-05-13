import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { Location } from 'history';
import { Translate } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import ErrorBoundary from 'app/shared/error/error-boundary';
import CompleteUserProfile from 'app/modules/auth/complete-profile/complete-user-profile';
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
}

interface IAppRouteOwnProps extends RouteProps, IAuthorizationCheckerOwnProps {}

export interface IAppRouteProps extends IAppRouteOwnProps, StateProps {}

const AppRouteComponent: React.FC<IAppRouteProps> = (props: IAppRouteProps) => {
  const { component: Component, isAuthenticated, isProfileCompleted, isPublic } = props;
  const locationState: IRedirectLocationState = { from: props.location };
  if (!isPublic && !isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: '/auth/login',
          search: props.location?.search,
          state: locationState,
        }}
      />
    );
  }
  if (!isPublic && !isProfileCompleted) {
    return (
      <ErrorBoundary>
        {/* @ts-ignore will refractor in issue 111 */}
        <CompleteUserProfile />
      </ErrorBoundary>
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
