import React from 'react';
import { IEvent, EventStatus } from '../../shared/model/event.model';
import { Container, Row, Col, Card, CardImg, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { Translate } from 'react-jhipster';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import './events.scss';
import EventModal from './event-modal';
import { CustomTab, ITabInfo } from '../../shared/components/customTab/custom-tab';
import FloatButton from '../../shared/components/floatButton/FloatButton';

const sampleTabList: ITabInfo[] = [
  {
    tabName: 'Upcoming',
    tabTranslateKey: 'clubmanagementApp.event.upcoming',
    tabRoute: '/event/details'
  },
  {
    tabName: 'Previous',
    tabTranslateKey: 'clubmanagementApp.event.previous',
    tabRoute: '/event/timeline'
  }
];

const dummy: IEvent[] = [
  {
    id: 1,
    name: 'First CC Gathering',
    description: ' First CC Event',
    remarks: undefined,
    venue: 'Dataran F',
    startDate: moment(),
    endDate: moment().add(1, 'days'),
    fee: 0,
    requiredTransport: false,
    status: EventStatus.OPEN,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
  },
  {
    id: 2,
    name: 'First CC Gathering',
    description: ' First CC Event',
    remarks: undefined,
    venue: 'Dataran F',
    startDate: moment(),
    endDate: moment().add(1, 'days'),
    fee: 0,
    requiredTransport: false,
    status: EventStatus.OPEN,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
  },
  {
    id: 3,
    name: 'First CC Gathering',
    description: ' First CC Event',
    remarks: undefined,
    venue: 'Dataran F',
    startDate: moment(),
    endDate: moment().add(1, 'days'),
    fee: 0,
    requiredTransport: false,
    status: EventStatus.OPEN,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
  },
  {
    id: 4,
    name: 'First CC Gathering',
    description: ' First CC Event',
    remarks: undefined,
    venue: 'Dataran F',
    startDate: moment(),
    endDate: moment().add(1, 'days'),
    fee: 0,
    requiredTransport: false,
    status: EventStatus.OPEN,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
  }
];

export interface IEventProp extends StateProps, DispatchProps {}

const EventCard = ({ event, toggleModal }) => (
  <Card className="p-3 pt-4 event-card">
    <Row>
      <Col xs="4" lg="5" className="pr-0">
        <CardImg height="100%" width="100%" className="rounded-0" src={event.imageUrl} alt="Event image" />
      </Col>
      <Col xs="8" lg="7">
        <Button color="link" className="option-icon p-0" onClick={() => toggleModal(event.id)}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </Button>
        <div className="my-auto">
          <Link to={`/events/${event.id}/details`}>
            <h4>{event.name}</h4>
          </Link>
          <p className="mb-0">Date: {event.startDate.format('DD MMM YYYY')}</p>
          <p className="mb-0">Time: {event.startDate.format('h:mm a')}</p>
          <p className="mb-0">Venue: {event.venue}</p>
        </div>
      </Col>
    </Row>
  </Card>
);

export class Events extends React.Component<IEventProp> {
  state = { modalIsOpen: false, eventId: null };

  toggleModal = eventId => {
    this.setState({ modalIsOpen: true, eventId: eventId });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, eventId: null });
  };

  renderedEvents = dummy.map(event => (
    <div className="my-3" key={event.id}>
      <EventCard event={event} toggleModal={this.toggleModal} />
    </div>
  ));

  render() {
    return (
      <Container>
        <EventModal isOpen={this.state.modalIsOpen} eventId={this.state.eventId} toggleModal={this.closeModal} />
        <FloatButton />
        <h1>Events</h1>
        <div className="d-flex justify-content-center">
          <CustomTab tabList={sampleTabList} currentTab="Upcoming" />
        </div>
        <div>{this.renderedEvents}</div>
      </Container>
    );
  }
}

const mapStateToProps = storeState => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
