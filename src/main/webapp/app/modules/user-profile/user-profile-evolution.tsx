import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import '../../shared/components/listing-card/listing-card.scss';

import { IRootState } from 'app/shared/reducers';
import { Row, Col } from 'reactstrap';
import { getCurrentUserCCInfoProfile } from './user-profile.reducer';

export interface IUserProfileEvolutionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class UserProfileEvolution extends React.Component<IUserProfileEvolutionProps> {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.getCurrentUserCCInfoProfile();
  }

  render() {
    const { userCCInfo } = this.props;
    return (
      <>
        {userCCInfo.length > 0 && (
          <div>
            {userCCInfo.map(ccInfo => (
              <CCInfoCard roleName={ccInfo.familyRole} fishLevel={ccInfo.fishLevel} yearSession={ccInfo.yearSession} />
            ))}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ user }: IRootState) => ({
  userCCInfo: user.userCCEvolutionInfo,
});

const mapDispatchToProps = {
  getCurrentUserCCInfoProfile,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileEvolution);

interface ICCInfoCardProps {
  roleName: string;
  fishLevel: string;
  yearSession: string;
}

const CCInfoCard: React.FC<ICCInfoCardProps> = ({ roleName, fishLevel, yearSession }) => (
  <Row className="justify-content-center">
    <Col xs="7">
      <h2 className="d-block my-1">{roleName}</h2>
      <h4 className="d-block my-1">{fishLevel}</h4>
      <span className="d-block my-1">{yearSession}</span>
    </Col>
    <Col xs="5">
      <img className="w-75" src="content/images/jhipster_family_member_0_head-192.png" alt="User Profile Evolution Image" />
    </Col>
  </Row>
);
