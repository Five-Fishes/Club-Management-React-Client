import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps, Link } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { CardImg, Container, Button, Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { emailLogin, getAuthToken } from 'app/shared/services/auth.service';
import { toast } from 'react-toastify';

export interface IAuthEmailLoginProps extends StateProps, RouteComponentProps<{}> {}

export interface IAuthEmailLoginState {
  isSubmitting: boolean;
}

export class AuthEmailLogin extends React.Component<IAuthEmailLoginProps, IAuthEmailLoginState> {
  constructor(props: IAuthEmailLoginProps) {
    super(props);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.state = {
      isSubmitting: false,
    };
  }

  handleValidSubmit(event: any, values: any) {
    this.setState({
      isSubmitting: true,
    });
    emailLogin(values)
      .then(firebaseToken => getAuthToken(firebaseToken))
      .then(() => {
        toast.success('Login Successfully');
        this.props.history.push('/');
      })
      .catch(() => {
        toast.error('Fail to login');
      })
      .finally(() => {
        this.setState({
          isSubmitting: false,
        });
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
              <AvForm onValidSubmit={this.handleValidSubmit} className="d-flex flex-column mt-3">
                <div>
                  <AvField
                    name="email"
                    placeholder="Email"
                    type="text"
                    className="mb-2"
                    validate={{
                      required: { value: true, errorMessage: 'Please enter your email' },
                      email: { value: true, errorMessage: 'This is not a valid email' },
                    }}
                  />
                </div>
                <div>
                  <AvField
                    name="password"
                    placeholder="Password"
                    type="password"
                    validate={{
                      required: { value: true, errorMessage: 'Please enter your password' },
                    }}
                  />
                </div>
                <Link to="/auth/email/reset" className="text-decoration-none">
                  Forget password?
                </Link>
                <Link to="/auth/email/register" className="text-decoration-none">
                  No account? Create now
                </Link>
                <Button type="submit" className="w-100 mt-4" disabled={this.state.isSubmitting}>
                  Sign In
                </Button>
                <Link to="/auth/login" className="text-center text-decoration-none my-1">
                  Sign in with other methods
                </Link>
              </AvForm>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(AuthEmailLogin);
