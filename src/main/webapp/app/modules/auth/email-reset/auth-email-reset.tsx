import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps, Link } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { CardImg, Container, Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { emailResetPassword } from 'app/shared/services/auth.service';
import { toast } from 'react-toastify';

export interface IAuthEmailResetProps extends StateProps, RouteComponentProps<{}> {}

export interface IAuthEmailResetState {
  isSubmitBtnEnabled: boolean;
}

export class AuthEmailReset extends React.Component<IAuthEmailResetProps, IAuthEmailResetState> {
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
    emailResetPassword(values.email)
      .then(() => {
        toast.success('Reset password instruction was sent to your inbox');
        this.props.history.push('/auth/email/login');
      })
      .catch(err => {
        toast.error('Fail to reset password');
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
                <Link to="/auth/email/register" className="text-decoration-none">
                  No account? Create now
                </Link>
                <Link to="/auth/login" className="text-decoration-none">
                  Already have an account? Sign in now
                </Link>
                <Button type="submit" className="w-100 mt-4" disabled={!this.state.isSubmitBtnEnabled}>
                  Reset Password
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

export default connect(mapStateToProps)(AuthEmailReset);
