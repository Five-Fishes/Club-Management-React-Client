import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './event-attendee.reducer';
import { IEventAttendee } from 'app/shared/model/event-attendee.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventAttendeeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EventAttendeeDetail extends React.Component<IEventAttendeeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { eventAttendeeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="clubmanagementApp.eventAttendee.detail.title">EventAttendee</Translate> [<b>{eventAttendeeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="userId">
                <Translate contentKey="clubmanagementApp.eventAttendee.userId">User Id</Translate>
              </span>
            </dt>
            <dd>{eventAttendeeEntity.userId}</dd>
            <dt>
              <span id="eventId">
                <Translate contentKey="clubmanagementApp.eventAttendee.eventId">Event Id</Translate>
              </span>
            </dt>
            <dd>{eventAttendeeEntity.eventId}</dd>
            <dt>
              <span id="provideTransport">
                <Translate contentKey="clubmanagementApp.eventAttendee.provideTransport">Provide Transport</Translate>
              </span>
            </dt>
            <dd>{eventAttendeeEntity.provideTransport ? 'true' : 'false'}</dd>
          </dl>
          <Button tag={Link} to="/entity/event-attendee" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/event-attendee/${eventAttendeeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ eventAttendee }: IRootState) => ({
  eventAttendeeEntity: eventAttendee.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventAttendeeDetail);
