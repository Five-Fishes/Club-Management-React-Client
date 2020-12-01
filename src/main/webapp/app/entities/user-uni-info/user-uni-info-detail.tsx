import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-uni-info.reducer';
import { IUserUniInfo } from 'app/shared/model/user-uni-info.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserUniInfoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UserUniInfoDetail extends React.Component<IUserUniInfoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { userUniInfoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="clubmanagementApp.userUniInfo.detail.title">UserUniInfo</Translate> [<b>{userUniInfoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="userId">
                <Translate contentKey="clubmanagementApp.userUniInfo.userId">User Id</Translate>
              </span>
            </dt>
            <dd>{userUniInfoEntity.userId}</dd>
            <dt>
              <span id="faculty">
                <Translate contentKey="clubmanagementApp.userUniInfo.faculty">Faculty</Translate>
              </span>
            </dt>
            <dd>{userUniInfoEntity.faculty}</dd>
            <dt>
              <span id="program">
                <Translate contentKey="clubmanagementApp.userUniInfo.program">Program</Translate>
              </span>
            </dt>
            <dd>{userUniInfoEntity.program}</dd>
            <dt>
              <span id="yearSession">
                <Translate contentKey="clubmanagementApp.userUniInfo.yearSession">Year Session</Translate>
              </span>
            </dt>
            <dd>{userUniInfoEntity.yearSession}</dd>
            <dt>
              <span id="intakeSemester">
                <Translate contentKey="clubmanagementApp.userUniInfo.intakeSemester">Intake Semester</Translate>
              </span>
            </dt>
            <dd>{userUniInfoEntity.intakeSemester}</dd>
            <dt>
              <span id="yearOfStudy">
                <Translate contentKey="clubmanagementApp.userUniInfo.yearOfStudy">Year Of Study</Translate>
              </span>
            </dt>
            <dd>{userUniInfoEntity.yearOfStudy}</dd>
            <dt>
              <span id="stayIn">
                <Translate contentKey="clubmanagementApp.userUniInfo.stayIn">Stay In</Translate>
              </span>
            </dt>
            <dd>{userUniInfoEntity.stayIn}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="clubmanagementApp.userUniInfo.status">Status</Translate>
              </span>
            </dt>
            <dd>{userUniInfoEntity.status}</dd>
          </dl>
          <Button tag={Link} to="/entity/user-uni-info" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/user-uni-info/${userUniInfoEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ userUniInfo }: IRootState) => ({
  userUniInfoEntity: userUniInfo.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserUniInfoDetail);
