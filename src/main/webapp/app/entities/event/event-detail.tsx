import './event-details.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './event.reducer';

// tslint:disable-next-line:no-unused-variable
import { APP_LOCAL_TIME_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { CustomTab } from 'app/shared/components/customTab/custom-tab';
import { eventTabList } from 'app/shared/util/tab.constants';

export interface IEventDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EventDetail extends React.Component<IEventDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { eventEntity } = this.props;
    const eventId = this.props.match.params.id;
    return (
      <Container>
        <h1>Event Details</h1>
        <div className="my-4">
          <CustomTab currentTab="Details" tabList={eventTabList(eventId)} />
        </div>
        <div className="pt-3">
          <img className="event-img" src={eventEntity.imageUrl} alt={eventEntity.fileName} />
          <div className="mt-4">
            <h2>{eventEntity.name}</h2>
            <div className="event-details-info my-3">
              <FontAwesomeIcon icon={'calendar-alt'} size="sm" />
              <h6>
                Date: <TextFormat value={eventEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />{' '}
              </h6>

              <FontAwesomeIcon icon={'clock'} size="sm" />
              <h6>
                Time: <TextFormat value={eventEntity.startDate} type="date" format={APP_LOCAL_TIME_FORMAT} />{' '}
              </h6>

              <FontAwesomeIcon icon={'map-marker-alt'} size="sm" />
              <h6>
                <Translate contentKey="clubmanagementApp.event.venue">Venue</Translate>: {eventEntity.venue}
              </h6>

              <FontAwesomeIcon icon={'money-bill-alt'} size="sm" />
              <h6>
                <Translate contentKey="clubmanagementApp.event.fee">Fee</Translate>: RM{eventEntity.fee}
              </h6>
            </div>
            <hr />
            <div className="desc-box">
              <h5>
                <Translate contentKey="clubmanagementApp.event.description">Description</Translate>
              </h5>
              <p>{eventEntity.description}</p>
            </div>
            <div className="d-flex flex-column">
              <Button tag={Link} to={`/entity/event/${eventEntity.id}/edit`} replace className="my-1" color="secondary">
                Update
              </Button>
              <Button className="my-1" color="action">
                Register
              </Button>
            </div>
          </div>
        </div>
      </Container>
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
