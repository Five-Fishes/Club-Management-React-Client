import React from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import ErrorBoundary from 'app/shared/error/error-boundary';

export const ErrorBoundaryRoute = ({ component: Component, ...rest }: RouteProps) => {
  if (!Component) throw new Error(`A component needs to be specified for path ${(rest as any).path}`);
  const encloseInErrorBoundary = (props: RouteComponentProps) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );

  return <Route {...rest} render={encloseInErrorBoundary} />;
};

export default ErrorBoundaryRoute;
