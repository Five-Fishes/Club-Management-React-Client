import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-cc-info.reducer';
import { IUserCCInfo } from 'app/shared/model/user-cc-info.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserCCInfoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UserCCInfoDetail extends React.Component<IUserCCInfoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { userCCInfoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="clubmanagementApp.userCCInfo.detail.title">UserCCInfo</Translate> [<b>{userCCInfoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="userId">
                <Translate contentKey="clubmanagementApp.userCCInfo.userId">User Id</Translate>
              </span>
            </dt>
            <dd>{userCCInfoEntity.userId}</dd>
            <dt>
              <span id="clubFamilyId">
                <Translate contentKey="clubmanagementApp.userCCInfo.clubFamilyId">Club Family Id</Translate>
              </span>
            </dt>
            <dd>{userCCInfoEntity.clubFamilyId}</dd>
            <dt>
              <span id="familyRole">
                <Translate contentKey="clubmanagementApp.userCCInfo.familyRole">Family Role</Translate>
              </span>
            </dt>
            <dd>{userCCInfoEntity.familyRole}</dd>
            <dt>
              <span id="yearSession">
                <Translate contentKey="clubmanagementApp.userCCInfo.yearSession">Year Session</Translate>
              </span>
            </dt>
            <dd>{userCCInfoEntity.yearSession}</dd>
            <dt>
              <span id="clubFamilyName">
                <Translate contentKey="clubmanagementApp.userCCInfo.clubFamilyName">Club Family Name</Translate>
              </span>
            </dt>
            <dd>{userCCInfoEntity.clubFamilyName}</dd>
          </dl>
          <Button tag={Link} to="/entity/user-cc-info" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/user-cc-info/${userCCInfoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ userCCInfo }: IRootState) => ({
  userCCInfoEntity: userCCInfo.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCCInfoDetail);
