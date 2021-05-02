import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Container, Row, Col, Card, CardImg, Button } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, TextFormat, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getUpcomingEntities, getPreviousEntities } from './event.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_12_ABR_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import FloatButton from 'app/shared/components/floatButton/FloatButton';
import EventModal from 'app/shared/components/eventModal/event-modal';
import CustomTab from 'app/shared/components/customTab/custom-tab';
import { eventMainTabList } from 'app/shared/util/tab.constants';
import './events.scss';
import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';
import { IEvent } from 'app/shared/model/event.model';

export interface IEventProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IEventState = IPaginationBaseState & {
  modalIsOpen: boolean;
  eventId: number;
};

export class Event extends React.Component<IEventProps, IEventState> {
  state: IEventState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    modalIsOpen: false,
    eventId: null
  };

  getTab = () => {
    const path = this.props.location.search;
    return path.substring(path.lastIndexOf('?') + 1);
  };

  componentDidMount() {
    const tab = this.getTab();
    if (tab === 'previous') {
      this.getPreviousEntities();
    } else {
      this.getUpcomingEntities();
    }
  }

  componentDidUpdate(prevProps) {
    const path = this.props.location.search;
    if (prevProps.location.search !== path) {
      const tab = path.substring(path.lastIndexOf('?') + 1);
      if (tab === 'previous') {
        this.getPreviousEntities();
      } else {
        this.getUpcomingEntities();
      }
    }
  }

  getUpcomingEntities = () => {
    const { activePage, itemsPerPage } = this.state;
    this.props.getUpcomingEntities(activePage - 1, itemsPerPage, `startDate,desc`);
  };

  getPreviousEntities = () => {
    const { activePage, itemsPerPage } = this.state;
    this.props.getPreviousEntities(activePage - 1, itemsPerPage, `startDate,desc`);
  };

  openModal = eventId => {
    this.setState({ modalIsOpen: true, eventId });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, eventId: null });
  };

  render() {
    const { eventList, match, totalItems } = this.props;
    const { eventId } = this.state;
    const tab = this.getTab();
    return (
      <Container>
        <EventModal
          isOpen={this.state.modalIsOpen}
          updatePath={`${match.url}/${eventId}/edit`}
          deletePath={`${match.url}/${eventId}/delete`}
          toggleModal={this.closeModal}
          updateBtnAuthorizationProps={{
            eventId,
            ccRole: CCRole.ADMIN,
            eventRole: EventRole.HEAD
          }}
          deleteBtnAuthorizationProps={{
            eventId,
            ccRole: CCRole.ADMIN,
            eventRole: EventRole.HEAD
          }}
        />
        <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.HEAD} eventId={eventId}>
          <Link to="/entity/event/new">
            <FloatButton />
          </Link>
        </AuthorizationChecker>
        <h1>Events</h1>
        <div className="my-3">
          <CustomTab currentTab={tab === 'previous' ? 'Previous' : 'Upcoming'} tabList={eventMainTabList} />
        </div>
        <div className="d-flex justify-content-center">{/* <CustomTab tabList={sampleTabList} currentTab="Upcoming" /> */}</div>
        <div>
          {eventList.map(event => (
            <div className="my-3" key={event.id}>
              <EventCard event={event} toggleModal={this.openModal} />
            </div>
          ))}
        </div>
      </Container>
    );
  }
}

interface IEventCardProps {
  event: IEvent;
  toggleModal: (eventId: number) => void;
}

const EventCard: React.FC<IEventCardProps> = ({ event, toggleModal }) => {
  const onToggleModal = () => toggleModal(event.id);
  return (
    <Card className="p-3 pt-4 event-card">
      <Row>
        <Col xs="4" lg="5" className="pr-0">
          <CardImg
            height="100%"
            width="100%"
            className="rounded-0"
            src={event.imageUrl ? event.imageUrl : 'content/images/placeholder.png'}
            alt={event.fileName}
          />
        </Col>
        <Col xs="8" lg="7">
          <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.HEAD} eventId={event.id}>
            <Button color="link" className="option-icon p-0" onClick={onToggleModal}>
              <FontAwesomeIcon icon={'ellipsis-h'} />
            </Button>
          </AuthorizationChecker>
          <div className="my-auto">
            <Link to={`/entity/event/${event.id}`}>
              <h4 className="event-title">{event.name}</h4>
            </Link>
            <p className="mb-0">
              <Translate contentKey="clubmanagementApp.event.startDate">Start Date</Translate>:{' '}
              <TextFormat type="date" value={event.startDate} format={APP_DATE_12_ABR_FORMAT} />
            </p>
            <p className="mb-0">
              <Translate contentKey="clubmanagementApp.event.endDate">End Date</Translate>:{' '}
              <TextFormat type="date" value={event.endDate} format={APP_DATE_12_ABR_FORMAT} />
            </p>
            <p className="mb-0">
              <Translate contentKey="clubmanagementApp.event.venue">Venue</Translate>: {event.venue}
            </p>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

const mapStateToProps = ({ event }: IRootState) => ({
  eventList: event.entities,
  totalItems: event.totalItems
});

const mapDispatchToProps = {
  getUpcomingEntities,
  getPreviousEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
