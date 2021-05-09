import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Switch, Route } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { getCurrentUserProfile, setUserProfileCurrentTab } from './user-profile.reducer';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { Translate } from 'react-jhipster';

import { logout } from 'app/shared/services/auth.service';
import CustomTab from 'app/shared/components/customTab/custom-tab';
import { profileTab } from 'app/shared/util/tab.constants';
import AppRoute from 'app/shared/auth/app-route';

import { UserProfileStats } from './user-profile-stats';
import { UserProfileEvolution } from './user-profile-evolution';
import { UserProfileRole } from './user-profile-role';
import { concatFullName } from 'app/shared/util/string-util';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

export interface IUserProfileProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

const UserProfileTabContent = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/stats`} component={UserProfileStats} />
      <ErrorBoundaryRoute path={`${match.url}`} component={UserProfileEvolution} />
      <ErrorBoundaryRoute exact path={`${match.url}/roles`} component={UserProfileRole} />
    </Switch>
  </>
);
export class UserProfile extends React.Component<IUserProfileProps, {}> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.tabOnClick = this.tabOnClick.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentUserProfile();
  }

  tabOnClick(tabName) {
    this.props.setUserProfileCurrentTab(tabName);
  }

  handleClick() {
    logout();
    toast.info('Logout Successfully');
    this.props.history.push('/');
  }

  render() {
    const { match } = this.props;
    const { firstName, lastName, gender, imageUrl } = this.props.userUniEntity;
    return (
      <>
        <div className="d-block text-center my-3">
          {Boolean(imageUrl) ? (
            <img className="border rounded-circle shadow profile-img" src={imageUrl} alt="User Profile Image" />
          ) : gender === 'MALE' ? (
            <img
              className="border rounded-circle shadow profile-img"
              src="content/images/jhipster_family_member_0_head-192.png"
              alt="User Profile Image"
            />
          ) : gender === 'FEMALE' ? (
            <img
              className="border rounded-circle shadow profile-img"
              src="content/images/jhipster_family_member_3_head-192.png"
              alt="User Profile Image"
            />
          ) : (
            <img className="border rounded-circle shadow profile-img" src="content/images/placeholder.png" alt="User Profile Image" />
          )}
        </div>
        <div className="text-center">
          <h2>{concatFullName(firstName, lastName)}</h2>
          <span className="d-block mx-auto mb-3 family-label py-2 px-3">Family</span>
          <p>Description</p>
        </div>
        {/* TODO: Profile Tab with Dynamic currentTab */}
        <CustomTab tabList={profileTab} handleClick={this.tabOnClick} />
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

const mapStateToProps = ({ authentication, user }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  userId: authentication.id,
  userUniEntity: user.entity,
  currentProfileTab: user.currentProfileTab,
});

const mapDispatchToProps = {
  getCurrentUserProfile,
  setUserProfileCurrentTab,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
