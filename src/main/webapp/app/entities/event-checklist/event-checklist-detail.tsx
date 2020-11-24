import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './event-checklist.reducer';
import { IEventChecklist } from 'app/shared/model/event-checklist.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventChecklistDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EventChecklistDetail extends React.Component<IEventChecklistDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { eventChecklistEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="clubmanagementApp.eventChecklist.detail.title">EventChecklist</Translate> [
            <b>{eventChecklistEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="eventId">
                <Translate contentKey="clubmanagementApp.eventChecklist.eventId">Event Id</Translate>
              </span>
            </dt>
            <dd>{eventChecklistEntity.eventId}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="clubmanagementApp.eventChecklist.name">Name</Translate>
              </span>
            </dt>
            <dd>{eventChecklistEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="clubmanagementApp.eventChecklist.description">Description</Translate>
              </span>
            </dt>
            <dd>{eventChecklistEntity.description}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="clubmanagementApp.eventChecklist.status">Status</Translate>
              </span>
            </dt>
            <dd>{eventChecklistEntity.status}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="clubmanagementApp.eventChecklist.type">Type</Translate>
              </span>
            </dt>
            <dd>{eventChecklistEntity.type}</dd>
          </dl>
          <Button tag={Link} to="/entity/event-checklist" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/event-checklist/${eventChecklistEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ eventChecklist }: IRootState) => ({
  eventChecklistEntity: eventChecklist.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventChecklistDetail);
