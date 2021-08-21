import './event-details.scss';
import '../../styles/event-module.scss';

import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './event.reducer';
import { getEntityByEventIdAndUserId } from '../event-attendee/event-attendee.reducer';

// tslint:disable-next-line:no-unused-variable
import CustomTab from 'app/shared/components/customTab/custom-tab';
import { eventTabList } from 'app/shared/util/tab.constants';
import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';
import { APP_DATE_12_FORMAT } from 'app/config/constants';

export interface IEventDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EventDetail extends React.Component<IEventDetailProps> {
  componentDidMount() {
    const eventId = parseInt(this.props.match.params.id, 10);
    this.props.getEntity(eventId);
    this.props.getEntityByEventIdAndUserId(eventId, this.props.userId);
  }

  componentDidUpdate(prevProps: IEventDetailProps) {
    const eventId = parseInt(this.props.match.params.id, 10);
    if (prevProps.userId !== this.props.userId && !isNaN(this.props.userId)) {
      this.props.getEntityByEventIdAndUserId(eventId, this.props.userId);
    }
  }

  render() {
    const { eventEntity, eventAttendeeEntity } = this.props;
    return (
      <div>
        <h1 className="event-module-heading">
          <Translate contentKey="clubmanagementApp.event.detail.title"> Event Details </Translate>
        </h1>
        <div className="my-3">{eventEntity.id && <CustomTab currentTab="Details" tabList={eventTabList(eventEntity.id)} />}</div>
        <div className="pt-3 mx-4">
          <img
            className="event-img"
            src={eventEntity.imageStorageDTO?.imageUrl ?? 'content/images/placeholder.png'}
            alt={eventEntity.imageStorageDTO?.fileName ?? 'Event Image Placeholder'}
          />
          <div className="mt-4">
            <h2>{eventEntity.name}</h2>
            <div className="event-details-info my-4">
              <FontAwesomeIcon icon={['far', 'calendar-alt']} size="sm" />
              <h6>
                <Translate contentKey="clubmanagementApp.event.startDate">Start Date</Translate>:{' '}
                <TextFormat value={eventEntity.startDate ?? ''} type="date" format={APP_DATE_12_FORMAT} />{' '}
              </h6>

              <FontAwesomeIcon icon={'calendar-alt'} size="sm" />
              <h6>
                <Translate contentKey="clubmanagementApp.event.endDate">End Date</Translate>:{' '}
                <TextFormat value={eventEntity.endDate ?? ''} type="date" format={APP_DATE_12_FORMAT} />{' '}
              </h6>

              <FontAwesomeIcon icon={'map-marker-alt'} size="sm" />
              <h6>
                <Translate contentKey="clubmanagementApp.event.venue">Venue</Translate>: {eventEntity.venue}
              </h6>

              <FontAwesomeIcon icon={'money-bill-alt'} size="sm" />
              <h6>
                <Translate contentKey="clubmanagementApp.event.fee">Fee</Translate>: RM{eventEntity.fee}
              </h6>

              <FontAwesomeIcon icon={'car'} size="sm" />
              <h6>
                {eventEntity.requiredTransport ? (
                  <Translate contentKey="clubmanagementApp.event.requiredTransport"> Required Transport </Translate>
                ) : (
                  <Translate contentKey="clubmanagementApp.event.noRequiredTransport"> No Required Transport </Translate>
                )}
              </h6>
            </div>
            <hr />
            <div className="desc-box mb-4">
              <h5>
                <Translate contentKey="clubmanagementApp.event.description">Description</Translate>
              </h5>
              <p>{eventEntity.description}</p>
            </div>

            {eventEntity.remarks ? (
              <>
                <hr />
                <div className="desc-box mb-5">
                  <h5>
                    <Translate contentKey="clubmanagementApp.event.remarks">Remarks</Translate>
                  </h5>
                  <p>{eventEntity.remarks}</p>
                </div>
              </>
            ) : null}
            <div className="d-flex flex-column">
              <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.HEAD} eventId={eventEntity.id}>
                <Button
                  tag={Link}
                  to={`/entity/event/${eventEntity.id}/edit`}
                  className="my-1"
                  color="secondary"
                  disabled={moment().isAfter(eventEntity.endDate)}
                >
                  <Translate contentKey="entity.action.update"> Update </Translate>
                </Button>
              </AuthorizationChecker>
              {eventAttendeeEntity.userId ? (
                <Button
                  tag={Link}
                  to={`/entity/event/${eventEntity.id}/eventAttendee/${eventAttendeeEntity.id}/delete`}
                  className="my-1"
                  color="cancel"
                >
                  <Translate contentKey="entity.action.deregister"> Deregister </Translate>
                </Button>
              ) : (
                <Button
                  tag={Link}
                  to={`/entity/event-attendee/event/${eventEntity.id}/new`}
                  className="my-1"
                  color="action"
                  disabled={moment().isAfter(eventEntity.endDate) || eventEntity.status === 'CANCELLED'}
                >
                  <Translate contentKey="entity.action.register"> Register </Translate>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ event, authentication, eventAttendee }: IRootState) => ({
  eventEntity: event.entity,
  userId: authentication.id,
  eventAttendeeEntity: eventAttendee.entity,
});

const mapDispatchToProps = { getEntity, getEntityByEventIdAndUserId };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
