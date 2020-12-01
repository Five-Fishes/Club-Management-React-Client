import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './event-crew.reducer';
import { IEventCrew } from 'app/shared/model/event-crew.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventCrewDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EventCrewDetail extends React.Component<IEventCrewDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { eventCrewEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="clubmanagementApp.eventCrew.detail.title">EventCrew</Translate> [<b>{eventCrewEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="userId">
                <Translate contentKey="clubmanagementApp.eventCrew.userId">User Id</Translate>
              </span>
            </dt>
            <dd>{eventCrewEntity.userId}</dd>
            <dt>
              <span id="eventId">
                <Translate contentKey="clubmanagementApp.eventCrew.eventId">Event Id</Translate>
              </span>
            </dt>
            <dd>{eventCrewEntity.eventId}</dd>
            <dt>
              <span id="role">
                <Translate contentKey="clubmanagementApp.eventCrew.role">Role</Translate>
              </span>
            </dt>
            <dd>{eventCrewEntity.role}</dd>
          </dl>
          <Button tag={Link} to="/entity/event-crew" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/event-crew/${eventCrewEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ eventCrew }: IRootState) => ({
  eventCrewEntity: eventCrew.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventCrewDetail);
