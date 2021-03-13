import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';

import DevTools from './config/devtools';
import store from './config/store';
import { registerLocale } from './config/translation';
import setupAxiosInterceptors from './config/axios-interceptor';
import ErrorBoundary from './shared/error/error-boundary';
import AppComponent from './app';
import { loadIcons } from './config/icon-loader';
import { AUTH_TOKEN_KEY, FIREBASE_TOKEN_KEY } from 'app/config/constants';
import { handleUnauthenticated } from './shared/services/auth.service';

const devTools = process.env.NODE_ENV === 'development' ? <DevTools /> : null;

registerLocale(store);
setupAxiosInterceptors(handleUnauthenticated);
loadIcons();

const rootEl = document.getElementById('root');

const render = Component =>
  ReactDOM.render(
    <ErrorBoundary>
      <Provider store={store}>
        <div className="h-100">
          {/* If this slows down the app in dev disable it and enable when required  */}
          {devTools}
          <Component />
        </div>
      </Provider>
    </ErrorBoundary>,
    rootEl
  );

render(AppComponent);
