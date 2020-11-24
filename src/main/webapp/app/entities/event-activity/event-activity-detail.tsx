import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './event-activity.reducer';
import { IEventActivity } from 'app/shared/model/event-activity.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventActivityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EventActivityDetail extends React.Component<IEventActivityDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { eventActivityEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="clubmanagementApp.eventActivity.detail.title">EventActivity</Translate> [<b>{eventActivityEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="eventId">
                <Translate contentKey="clubmanagementApp.eventActivity.eventId">Event Id</Translate>
              </span>
            </dt>
            <dd>{eventActivityEntity.eventId}</dd>
            <dt>
              <span id="startDate">
                <Translate contentKey="clubmanagementApp.eventActivity.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={eventActivityEntity.startDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="durationInDay">
                <Translate contentKey="clubmanagementApp.eventActivity.durationInDay">Duration In Day</Translate>
              </span>
            </dt>
            <dd>{eventActivityEntity.durationInDay}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="clubmanagementApp.eventActivity.name">Name</Translate>
              </span>
            </dt>
            <dd>{eventActivityEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="clubmanagementApp.eventActivity.description">Description</Translate>
              </span>
            </dt>
            <dd>{eventActivityEntity.description}</dd>
          </dl>
          <Button tag={Link} to="/entity/event-activity" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/event-activity/${eventActivityEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ eventActivity }: IRootState) => ({
  eventActivityEntity: eventActivity.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventActivityDetail);
