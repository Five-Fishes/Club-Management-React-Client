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
  constructor(props: IUserProfileStatsProps) {
    super(props);
  }

  render() {
    const { gender, dateOfBirth, phoneNumber, email } = this.props.userEntity;
    return (
      <>
        <div className="card-container container my-3">
          <Row className="justify-content-center">
            <Col xs="9">
              <h6 className="d-block mb-1">{gender}</h6>
              <h6 className="d-block mb-1">{convertDateTimeFromServerToLocaleDate(dateOfBirth)}</h6>
              <h6 className="d-block mb-1">{phoneNumber}</h6>
              <a href={'mailto:' + email}>
                <h6 className="d-block mb-1">{email}</h6>
              </a>
            </Col>
            <Col xs="2">
              <Button color="white" className="bg-transparent text-dark" tag={Link} id="update-profile-btn" to="/profile/update" replace>
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
