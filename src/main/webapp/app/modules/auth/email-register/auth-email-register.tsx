import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { CardImg, Container, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { emailRegister } from 'app/shared/services/auth.service';
import { toast } from 'react-toastify';

export interface IAuthEmailRegisterProps extends StateProps, RouteComponentProps<{}> {}

export interface IAuthEmailRegisterState {
  isSubmitBtnEnabled: boolean;
}

export class AuthEmailRegister extends React.Component<IAuthEmailRegisterProps, IAuthEmailRegisterState> {
  constructor(props) {
    super(props);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.state = {
      isSubmitBtnEnabled: true
    };
  }

  handleValidSubmit(event, values) {
    this.setState({
      isSubmitBtnEnabled: false
    });
    emailRegister(values)
      .then(() => {
        toast.success('Please verify your email before login');
        this.props.history.push('/auth/email/login');
      })
      .catch(() => {
        toast.error('Fail to register an account');
      })
      .finally(() => {
        this.setState({
          isSubmitBtnEnabled: true
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
                      email: { value: true, errorMessage: 'This is not a valid email' }
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
                      pattern: {
                        value: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
                        errorMessage: 'Password must contain at least 1 lowercase character, 1 uppercase character and 1 digit'
                      },
                      minLength: {
                        value: 8,
                        errorMessage: 'Password must have at least 8 characters'
                      }
                    }}
                  />
                </div>
                <div>
                  <AvField
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    validate={{
                      required: { value: true, errorMessage: 'Please confirm your password' },
                      match: { value: 'password', errorMessage: 'Password is not the same' }
                    }}
                  />
                </div>
                <Link to="/auth/login" className="text-decoration-none">
                  Already have an account? Sign in now
                </Link>
                <Button type="submit" className="w-100 mt-4" disabled={!this.state.isSubmitBtnEnabled}>
                  Create Account
                </Button>
              </AvForm>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps,
  null
)(AuthEmailRegister);
