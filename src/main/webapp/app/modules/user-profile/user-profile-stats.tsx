import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import '../../shared/components/listing-card/listing-card.scss';

import { IRootState } from 'app/shared/reducers';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertDateTimeFromServerToLocaleDate } from 'app/shared/util/date-utils';

export interface IUserProfileStatsProps extends StateProps, RouteComponentProps<{}> {}

export class UserProfileStats extends React.Component<IUserProfileStatsProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { userEntity } = this.props;
    // TODO: userEntity appear to be undefined
    return (
      <>
        <div className="card-container container my-3">
          <Row className="justify-content-center">
            <Col xs="9">
              <span className="d-block mb-1">{userEntity.gender}</span>
              <span className="d-block mb-1">{convertDateTimeFromServerToLocaleDate(userEntity.dateOfBirth)}</span>
              <span className="d-block mb-1">{userEntity.phoneNumber}</span>
              <span className="d-block mb-1">{userEntity.email}</span>
            </Col>
            <Col xs="2">
              <Button tag={Link} id="update-profile-btn" to="/profile/update" replace>
                <FontAwesomeIcon icon="pen" />
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user }: IRootState) => ({
  userEntity: user.entity,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(UserProfileStats);
