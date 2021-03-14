import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps, Link } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardImg, Container, Button, Row, Col } from 'reactstrap';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import firebase from 'firebase';
import { toast } from 'react-toastify';
import { getAuthToken, socialLogin } from 'app/shared/services/auth.service';

export interface IAuthLoginProps extends StateProps, RouteComponentProps<{}> {}

interface ILoginConfig {
  type: 'google' | 'facebook' | 'email';
  displayName: string;
  icon: IconProp;
  bgColor: string;
  textColor: string;
}

export class AuthLogin extends React.Component<IAuthLoginProps> {
  constructor(props) {
    super(props);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    this.handleEmailLogin = this.handleEmailLogin.bind(this);
  }

  handleEmailLogin() {
    this.props.history.push('/auth/email/login');
  }

  async handleGoogleLogin() {
    socialLogin('google')
      .then(firebaseToken => getAuthToken(firebaseToken))
      .then(() => toast.success('Login Successfully'))
      .catch(error => {
        const firebaseError = error as firebase.FirebaseError;
        const errorMessage = firebaseError.message;
        toast.error(errorMessage);
      });
  }

  handleFacebookLogin() {
    socialLogin('facebook')
      .then(firebaseToken => getAuthToken(firebaseToken))
      .then(() => toast.success('Login Successfully'))
      .catch(error => {
        const firebaseError = error as firebase.FirebaseError;
        const errorMessage = firebaseError.message;
        toast.error(errorMessage);
      });
  }

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <Container className="h-100 w-75 d-flex align-items-center justify-content-center pb-3">
          <Row className="h-100 d-flex align-items-center justify-content-center">
            <Col xs="12" md="6">
              <CardImg className="my-2" width="100%" src="content/images/thirdcc_logo.png" alt="3rd CC Logo" />
            </Col>
            <Col xs="12" md="6" lg="4" className="my-auto offset-lg-2">
              <LoginButton type="google" handleLogin={this.handleGoogleLogin} />
              <LoginButton type="facebook" handleLogin={this.handleFacebookLogin} />
              <LoginButton type="email" handleLogin={this.handleEmailLogin} />
              <Link to="/auth/email/register" className="text-decoration-none my-3">
                No account? Create now
              </Link>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const config: ILoginConfig[] = [
  {
    type: 'google',
    displayName: 'Google',
    icon: ['fab', 'google'],
    bgColor: '#FFF',
    textColor: '#533f03'
  },
  {
    type: 'facebook',
    displayName: 'Facebook',
    icon: ['fab', 'facebook-f'],
    bgColor: '#3B5998',
    textColor: '#FFF'
  },
  {
    type: 'email',
    displayName: 'Email',
    icon: 'envelope',
    bgColor: '#1DB2A1',
    textColor: '#FFF'
  }
];

function LoginButton(props) {
  const { handleLogin } = props;
  const selectedConfig = config.find(el => el.type === props.type);
  if (!selectedConfig) {
    throw new Error('config not declared for this sign in method');
  }
  return (
    <>
      <div className="w-100 my-3">
        <Button
          className="w-100 d-flex align-items-center rounded shadow"
          style={{ backgroundColor: selectedConfig.bgColor, color: selectedConfig.textColor, borderColor: '#c2c2c2' }}
          onClick={handleLogin}
        >
          <FontAwesomeIcon icon={selectedConfig.icon} className="mr-2" />
          <span className="flex-grow-1">Sign In with {selectedConfig.displayName}</span>
        </Button>
      </div>
    </>
  );
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(AuthLogin);
