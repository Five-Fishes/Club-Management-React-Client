import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import '../../shared/components/listing-card/listing-card.scss';

import { IRootState } from 'app/shared/reducers';
import { Row, Col } from 'reactstrap';

export interface IUserProfileEvolutionProps extends StateProps, RouteComponentProps<{}> {}

export class UserProfileEvolution extends React.Component<IUserProfileEvolutionProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="card-container container my-3">
          <Row className="justify-content-center">
            <Col xs="7">
              <h2 className="d-block my-1">Member</h2>
              <span className="d-block my-1">Year Session</span>
            </Col>
            <Col xs="5">
              <img className="w-75" src="content/images/jhipster_family_member_0_head-192.png" alt="User Profile Evolution Image" />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({  }: IRootState) => ({});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(UserProfileEvolution);
