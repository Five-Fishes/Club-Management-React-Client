import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { Container, Button } from 'reactstrap';
import { logout } from 'app/shared/services/auth.service';
import { toast } from 'react-toastify';

export interface IUserProfileProps extends StateProps, RouteComponentProps<{}> {}

export interface IUserProfileState {}

export class UserProfile extends React.Component<IUserProfileProps, IUserProfileState> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    logout();
    toast.info('Logout Successfully');
    this.props.history.push('/');
  }

  render() {
    return (
      <>
        <Container className="h-100 w-75 d-flex align-items-center justify-content-center pb-3">
          <Button onClick={this.handleClick}>Logout</Button>
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
)(UserProfile);
