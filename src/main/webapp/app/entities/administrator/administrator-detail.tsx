import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './administrator.reducer';
import { IAdministrator } from 'app/shared/model/administrator.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAdministratorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AdministratorDetail extends React.Component<IAdministratorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { administratorEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="clubmanagementApp.administrator.detail.title">Administrator</Translate> [<b>{administratorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="userId">
                <Translate contentKey="clubmanagementApp.administrator.userId">User Id</Translate>
              </span>
            </dt>
            <dd>{administratorEntity.userId}</dd>
            <dt>
              <span id="yearSession">
                <Translate contentKey="clubmanagementApp.administrator.yearSession">Year Session</Translate>
              </span>
            </dt>
            <dd>{administratorEntity.yearSession}</dd>
            <dt>
              <span id="role">
                <Translate contentKey="clubmanagementApp.administrator.role">Role</Translate>
              </span>
            </dt>
            <dd>{administratorEntity.role}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="clubmanagementApp.administrator.status">Status</Translate>
              </span>
            </dt>
            <dd>{administratorEntity.status}</dd>
          </dl>
          <Button tag={Link} to="/entity/administrator" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/administrator/${administratorEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ administrator }: IRootState) => ({
  administratorEntity: administrator.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdministratorDetail);
