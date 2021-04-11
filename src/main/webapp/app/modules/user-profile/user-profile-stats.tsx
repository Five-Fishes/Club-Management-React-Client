import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import '../../shared/components/listing-card/listing-card.scss';

import { IRootState } from 'app/shared/reducers';
import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IUserProfileStatsProps extends StateProps, RouteComponentProps<{}> {}

export class UserProfileStats extends React.Component<IUserProfileStatsProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="card-container container my-3">
          <Row className="justify-content-center">
            <Col xs="9">
              <span className="d-block mb-1">Gender</span>
              <span className="d-block mb-1">Date of Birth</span>
              <span className="d-block mb-1">Contact Number</span>
              <span className="d-block mb-1">Email</span>
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

const mapStateToProps = ({  }: IRootState) => ({});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(UserProfileStats);
