import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import '../../shared/components/listing-card/listing-card.scss';

import { IRootState } from 'app/shared/reducers';
import { Row, Col } from 'reactstrap';
import { CCRoleType } from 'app/shared/model/user-cc-role-info.model';
import { getCurrentUserCCRolesProfile } from './user-profile.reducer';

export interface IUserProfileRoleProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

class UserProfileRole extends React.Component<IUserProfileRoleProps, {}> {
  constructor(props: IUserProfileRoleProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrentUserCCRolesProfile();
  }

  render() {
    const { userCCRoleInfo } = this.props;
    return (
      <>
        {userCCRoleInfo.length > 0 && (
          <div>
            {userCCRoleInfo.map((roleInfo, index) => (
              <CCRoleCard
                key={`role-info-${index}`}
                roleName={roleInfo.role}
                roleType={roleInfo.type}
                yearSession={roleInfo.yearSession}
                eventName={roleInfo.eventName}
              />
            ))}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ user }: IRootState) => ({
  userCCRoleInfo: user.userCCRolesInfo,
});

const mapDispatchToProps = {
  getCurrentUserCCRolesProfile,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileRole);

interface ICCRoleCardProps {
  key: string;
  roleType?: CCRoleType;
  roleName?: string;
  yearSession?: string;
  eventName?: string;
}

const CCRoleCard: React.FC<ICCRoleCardProps> = ({ roleType, roleName, yearSession, eventName }) => (
  <div className="card-container container my-3">
    <Row className="justify-content-center align-items-center">
      <Col xs="7">
        {roleType === CCRoleType.EVENT_CREW ? <h2 className="d-block my-1">{eventName}</h2> : <h2 className="d-block my-1">Third CC</h2>}
        <h6 className="d-block my-1">{roleName}</h6>
        <h6 className="d-block my-1">{yearSession}</h6>
      </Col>
      <Col xs="5">
        <img className="w-75" src="content/images/shark.png" alt="User Profile Evolution Image" />
      </Col>
    </Row>
  </div>
);
