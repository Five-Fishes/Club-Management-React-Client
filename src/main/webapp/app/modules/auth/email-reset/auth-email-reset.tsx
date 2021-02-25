import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { login } from 'app/shared/reducers/authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardImg, Container, Button, Row, Col, Label } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';

export interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface IAuthEmailResetState {}

export class AuthEmailReset extends React.Component<ILoginProps> {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {};
  }

  handleSubmit(event, errors, values) {
    console.log(values);
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
              <AvForm onSubmit={this.handleSubmit} className="d-flex flex-column mt-3">
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
                <Button type="submit" className="w-100 mt-4">
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

const mapDispatchToProps = { login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthEmailReset);
