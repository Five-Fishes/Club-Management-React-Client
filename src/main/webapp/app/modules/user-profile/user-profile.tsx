import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Switch } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { Translate } from 'react-jhipster';

import { logout } from 'app/shared/services/auth.service';
import { CustomTab } from 'app/shared/components/customTab/custom-tab';
import { profileTab } from 'app/shared/util/tab.constants';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import { UserProfileStats } from './user-profile-stats';
import { UserProfileEvolution } from './user-profile-evolution';
import { UserProfileRole } from './user-profile-role';

export interface IUserProfileProps extends StateProps, RouteComponentProps<{}> {}

const UserProfileTabContent = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/stats`} component={UserProfileStats} />
      <ErrorBoundaryRoute exact path={`${match.url}/evolution`} component={UserProfileEvolution} />
      <ErrorBoundaryRoute exact path={`${match.url}/roles`} component={UserProfileRole} />
    </Switch>
  </>
);
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
    const { match } = this.props;
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
        {/* TODO: Profile Tab with Dynamic currentTab */}
        <CustomTab tabList={profileTab} currentTab="Stats" />
        {/* TODO: Dynamic Profile Tab Content */}
        <UserProfileTabContent match={match} />
        <div className="d-block text-center mb-2">
          <Button color="action px-5" onClick={this.handleClick}>
            <Translate contentKey="global.menu.account.logout">Logout</Translate>
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
