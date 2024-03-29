import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import './styles/custom.scss';

import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { hot } from 'react-hot-loader';

import { IRootState } from 'app/shared/reducers';
import { getProfile } from 'app/shared/reducers/application-profile';
import { setLocale } from 'app/shared/reducers/locale';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import ErrorBoundary from 'app/shared/error/error-boundary';
import AppRoutes from 'app/routes';
import { fetchAccount } from './shared/services/auth.service';

let baseHref = (document.querySelector('base') as HTMLBaseElement).getAttribute('href') ?? '';
baseHref = baseHref.replace(/\/$/, '');

export interface IAppProps extends StateProps, DispatchProps {}

export class App extends React.Component<IAppProps> {
  componentDidMount() {
    fetchAccount(); // TODO: @LUXIANZE Fix this, this api requires authenticated user, if user is logged out as token expired, this call will always fail
    /**
     * Work around while this is not fixes
     * 1. Comment out line: 27
     * 2. Start app and login
     * 3. Re-enable line: 27
     */
    this.props.getProfile();
  }

  render() {
    return (
      <Router basename={baseHref}>
        <div className="h-100 d-flex flex-column" style={{ overflowX: 'hidden' }}>
          <ToastContainer position={toast.POSITION.BOTTOM_LEFT} className="toastify-container" toastClassName="toastify-toast" />
          <ErrorBoundary>
            <Header
              isAuthenticated={this.props.isAuthenticated}
              currentLocale={this.props.currentLocale}
              onLocaleChange={this.props.setLocale}
              ribbonEnv={this.props.ribbonEnv}
              isSwaggerEnabled={this.props.isSwaggerEnabled}
            />
          </ErrorBoundary>

          <div className="flex-grow-1">
            <ErrorBoundary>
              <div>
                <AppRoutes />
              </div>
            </ErrorBoundary>
          </div>

          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ authentication, applicationProfile, locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
  isAuthenticated: authentication.isAuthenticated,
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
});

const mapDispatchToProps = { setLocale, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
