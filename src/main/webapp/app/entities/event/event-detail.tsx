import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './event.reducer';
import { IEvent } from 'app/shared/model/event.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EventDetail extends React.Component<IEventDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { eventEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="clubmanagementApp.event.detail.title">Event</Translate> [<b>{eventEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="clubmanagementApp.event.name">Name</Translate>
              </span>
            </dt>
            <dd>{eventEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="clubmanagementApp.event.description">Description</Translate>
              </span>
            </dt>
            <dd>{eventEntity.description}</dd>
            <dt>
              <span id="remarks">
                <Translate contentKey="clubmanagementApp.event.remarks">Remarks</Translate>
              </span>
            </dt>
            <dd>{eventEntity.remarks}</dd>
            <dt>
              <span id="venue">
                <Translate contentKey="clubmanagementApp.event.venue">Venue</Translate>
              </span>
            </dt>
            <dd>{eventEntity.venue}</dd>
            <dt>
              <span id="startDate">
                <Translate contentKey="clubmanagementApp.event.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={eventEntity.startDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDate">
                <Translate contentKey="clubmanagementApp.event.endDate">End Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={eventEntity.endDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="fee">
                <Translate contentKey="clubmanagementApp.event.fee">Fee</Translate>
              </span>
            </dt>
            <dd>{eventEntity.fee}</dd>
            <dt>
              <span id="requiredTransport">
                <Translate contentKey="clubmanagementApp.event.requiredTransport">Required Transport</Translate>
              </span>
            </dt>
            <dd>{eventEntity.requiredTransport ? 'true' : 'false'}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="clubmanagementApp.event.status">Status</Translate>
              </span>
            </dt>
            <dd>{eventEntity.status}</dd>
            <dt>
              <span id="imageUrl">
                <Translate contentKey="clubmanagementApp.event.imageUrl">Image Url</Translate>
              </span>
            </dt>
            <dd>{eventEntity.imageUrl}</dd>
            <dt>
              <span id="fileName">
                <Translate contentKey="clubmanagementApp.event.fileName">File Name</Translate>
              </span>
            </dt>
            <dd>{eventEntity.fileName}</dd>
            <dt>
              <span id="fileType">
                <Translate contentKey="clubmanagementApp.event.fileType">File Type</Translate>
              </span>
            </dt>
            <dd>{eventEntity.fileType}</dd>
          </dl>
          <Button tag={Link} to="/entity/event" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/event/${eventEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ event }: IRootState) => ({
  eventEntity: event.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetail);
