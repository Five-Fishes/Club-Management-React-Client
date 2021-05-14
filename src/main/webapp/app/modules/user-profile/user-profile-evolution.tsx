import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import '../../shared/components/listing-card/listing-card.scss';

import { IRootState } from 'app/shared/reducers';
import { Row, Col } from 'reactstrap';
import { getCurrentUserCCInfoProfile } from './user-profile.reducer';

export interface IUserProfileEvolutionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

class UserProfileEvolution extends React.Component<IUserProfileEvolutionProps> {
  constructor(props: IUserProfileEvolutionProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrentUserCCInfoProfile();
  }

  render() {
    const { userCCInfo } = this.props;
    return (
      <>
        {userCCInfo.length > 0 && (
          <div>
            {userCCInfo.map((ccInfo, index) => (
              <CCInfoCard
                key={`cc-info-${index}`}
                roleName={ccInfo.familyRole}
                fishLevel={ccInfo.fishLevel}
                yearSession={ccInfo.yearSession}
              />
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
  key: string;
  roleName?: string;
  fishLevel?: string;
  yearSession?: string;
}

const CCInfoCard: React.FC<ICCInfoCardProps> = ({ roleName, fishLevel, yearSession }) => (
  <div className="card-container container my-3">
    <Row className="justify-content-center align-items-center">
      <Col xs="7">
        <h2 className="d-block my-1">{roleName}</h2>
        <h4 className="d-block my-1">{fishLevel}</h4>
        <h6 className="d-block my-1">{yearSession}</h6>
      </Col>
      <Col xs="5">
        <img className="w-75" src="content/images/black-whale.png" alt="User Profile Evolution Image" />
      </Col>
    </Row>
  </div>
);
