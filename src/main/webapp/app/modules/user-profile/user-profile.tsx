import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { Row, Col, Button } from 'reactstrap';
import { logout } from 'app/shared/services/auth.service';
import { toast } from 'react-toastify';
import { CustomTab } from 'app/shared/components/customTab/custom-tab';
import { profileTab } from 'app/shared/util/tab.constants';

export interface IUserProfileProps extends StateProps, RouteComponentProps<{}> {}

export class UserProfile extends React.Component<IUserProfileProps, {}> {
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
        <div className="d-block text-center my-3">
          <img
            className="border rounded-circle shadow profile-img"
            src="content/images/jhipster_family_member_0_head-192.png"
            alt="User Profile Image"
          />
        </div>
        <div className="text-center">
          <h1>User Full Name</h1>
          <span className="d-block mx-auto mb-3 family-label py-2 px-3">Family</span>
          <p>Description</p>
        </div>
        {/* TODO: Profile Tab */}
        <CustomTab tabList={profileTab} currentTab="Stats" />
        {/* TODO: Dynamic Profile Tab Content */}
        <div className="d-block text-center">
          <Button color="action px-5" onClick={this.handleClick}>
            Logout
          </Button>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(UserProfile);
