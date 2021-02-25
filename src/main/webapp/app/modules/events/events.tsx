import React from 'react';
import { IEvent, EventStatus } from '../../shared/model/event.model';
import { Container, Row, Col, Card, CardImg, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './events.css';
import FloatButton from '../../shared/layout/floatButton/FloatButton';

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
  }
];

export class Events extends React.Component {
  renderedEvents = dummy.map(event => {
    return (
      <div className="my-3" key={event.id}>
        <Card className="p-4">
          <Row>
            <Col xs="4" className="pr-0">
              <CardImg height="100%" width="100%" src={event.imageUrl} alt="Event image" />
            </Col>
            <Col xs="8">
              <Button color="link" className="option-icon p-0">
                <FontAwesomeIcon icon={faEllipsisH} />
              </Button>
              <div className="my-auto">
                <h4>{event.name}</h4>
                <p className="mb-0">Date: {event.startDate.format('DD MMM YYYY')}</p>
                <p className="mb-0">Time: {event.startDate.format('h:mm a')}</p>
                <p className="mb-0">Venue: {event.venue}</p>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    );
  });

  render() {
    return (
      <Container>
        <FloatButton />
        <Row>
          <h1>Events</h1>
        </Row>
        <div>{this.renderedEvents}</div>
      </Container>
    );
  }
}

export default Events;
