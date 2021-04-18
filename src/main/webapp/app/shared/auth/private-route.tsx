import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import ErrorBoundary from 'app/shared/error/error-boundary';
import CompleteUserProfile from 'app/modules/auth/complete-profile/complete-user-profile';

interface IOwnProps extends RouteProps {
  hasAnyAuthorities?: string[];
}

export interface IPrivateRouteProps extends IOwnProps, StateProps {}

export const PrivateRouteComponent = ({
  component: Component,
  isAuthenticated,
  isProfileCompleted,
  hasAnyAuthorities = [],
  isAuthorized,
  ...rest
}: IPrivateRouteProps) => {
  const checkAuthorities = props =>
    isAuthenticated && !isProfileCompleted ? (
      <ErrorBoundary>
        <CompleteUserProfile />
      </ErrorBoundary>
    ) : isAuthorized ? (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    ) : (
      <div className="insufficient-authority">
        <div className="alert alert-danger">
          <Translate contentKey="error.http.403">You are not authorized to access this page.</Translate>
        </div>
      </div>
    );

  const renderRedirect = props => {
    return isAuthenticated ? (
      checkAuthorities(props)
    ) : (
      <Redirect
        to={{
          pathname: '/auth/login',
          search: props.location.search,
          state: { from: props.location }
        }}
      />
    );
  };

  if (!Component) throw new Error(`A component needs to be specified for private route for path ${(rest as any).path}`);

  return <Route {...rest} render={renderRedirect} />;
};

export function hasAnyAuthority(authorities: string[], hasAnyAuthorities: string[]): boolean {
  if (authorities && authorities.length === 0) {
    return false;
  }
  if (hasAnyAuthorities.length === 0) {
    return true;
  }
  return hasAnyAuthorities.some(auth => authorities.includes(auth));
}

const mapStateToProps = (
  { authentication: { isAuthenticated, authorities, isProfileCompleted } }: IRootState,
  { hasAnyAuthorities = [] }: IOwnProps
) => ({
  isAuthenticated,
  isAuthorized: hasAnyAuthority(authorities, hasAnyAuthorities),
  isProfileCompleted
});

type StateProps = ReturnType<typeof mapStateToProps>;

/**
 * A route wrapped in an authentication check so that routing happens only when you are authenticated.
 * Accepts same props as React router Route.
 * The route also checks for authorization if hasAnyAuthorities is specified.
 */
export const PrivateRoute = connect<StateProps, undefined, IOwnProps>(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(PrivateRouteComponent);

export default PrivateRoute;
