import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { login } from 'app/shared/reducers/authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardImg, Container, Button, Row, Col } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface IAuthLoginState {}

interface ILoginConfig {
  type: 'google' | 'facebook' | 'email';
  displayName: string;
  icon: IconProp;
  bgColor: string;
  textColor: string;
  callback: () => void;
}

export class AuthLogin extends React.Component<ILoginProps> {
  state: IAuthLoginState = {};

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <Container>
          <Row>
            <Col xs="12" sm="6">
              <CardImg className="my-2" width="100%" src="content/images/thirdcc_logo.png" alt="3rd CC Logo" />
            </Col>
            <Col xs="0" lg="3">
              {/* empty space for lg*/}
            </Col>
            <Col xs="12" sm="6" lg="3" className="my-auto">
              <LoginButton type="google" />
              <LoginButton type="facebook" />
              <LoginButton type="email" />
              <Link to="/auth/register" className="text-left">
                {' '}
                No account? Create now
              </Link>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

function LoginButton(props) {
  const history = useHistory();
  const config: ILoginConfig[] = [
    {
      type: 'google',
      displayName: 'Google',
      icon: ['fab', 'google'],
      bgColor: '#FFF',
      textColor: '#533f03',
      callback: function() {
        console.log('Google');
      }
    },
    {
      type: 'facebook',
      displayName: 'Facebook',
      icon: ['fab', 'facebook-f'],
      bgColor: '#3B5998',
      textColor: '#FFF',
      callback: function() {
        console.log('Facebook');
      }
    },
    {
      type: 'email',
      displayName: 'Email',
      icon: 'envelope',
      bgColor: '#1DB2A1',
      textColor: '#FFF',
      callback: function() {
        console.log('Email');
        history.push('/auth/login/email');
      }
    }
  ];

  const selectedConfig = config.find(el => el.type === props.type);
  if (!selectedConfig) {
    throw new Error('config not declared for this sign in method');
  }
  return (
    <>
      <div className="w-100 my-2">
        <Button
          className="w-100 d-flex align-items-center shadow"
          style={{ backgroundColor: selectedConfig.bgColor, color: selectedConfig.textColor }}
          onClick={selectedConfig.callback}
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

const mapDispatchToProps = { login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLogin);
