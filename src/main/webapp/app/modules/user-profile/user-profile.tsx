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

import UserProfileStats from './user-profile-stats';
import UserProfileEvolution from './user-profile-evolution';
import UserProfileRole from './user-profile-role';
import { concatFullName } from 'app/shared/util/string-util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IUserProfileProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const UserProfileTabContent: React.FC<RouteComponentProps> = ({ match }) => (
  <>
    <Switch>
      <AppRoute exact path={`${match.url}/stats`} component={UserProfileStats} />
      <AppRoute exact path={`${match.url}/evolution`} component={UserProfileEvolution} />
      <AppRoute exact path={`${match.url}/roles`} component={UserProfileRole} />
    </Switch>
  </>
);
export class UserProfile extends React.Component<IUserProfileProps, {}> {
  constructor(props: IUserProfileProps) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.tabOnClick = this.tabOnClick.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentUserProfile();
  }

  tabOnClick(tabName: string) {
    this.props.setUserProfileCurrentTab(tabName);
  }

  handleLogout() {
    logout();
    toast.info('Logout Successfully');
    this.props.history.push('/');
  }

  render() {
    const { match, location, history, currentProfileTab } = this.props;
    const { firstName, lastName, gender, imageUrl, clubFamilyId, clubFamilyName, clubFamilyDescription } = this.props.userUniEntity;
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
          <h1>{concatFullName(firstName, lastName)}</h1>
          {Boolean(clubFamilyId) && (
            <>
              <h3 className="d-block mx-auto mb-3 family-label py-2 px-3">
                <FontAwesomeIcon icon="fish" />
                &nbsp;{clubFamilyName}
              </h3>
              <p className="family-description">{clubFamilyDescription}</p>
            </>
          )}
        </div>

        <CustomTab tabList={profileTab} currentTab={currentProfileTab} handleClick={this.tabOnClick} />
        <div className="mx-2">
          <UserProfileTabContent match={match} location={location} history={history} />
        </div>
        <div className="d-block text-center my-5">
          <Button color="action px-5" onClick={this.handleLogout}>
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
