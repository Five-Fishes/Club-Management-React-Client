import React from 'react';
import IEvent from '../../shared/model/event.model';
import { Container, Row, Col, Card, CardImg, CardTitle, CardSubtitle } from 'reactstrap';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { Link } from 'react-router-dom';
import moment from 'moment';

const dummy: IEvent[] = [
  {
    name: 'First CC Gathering',
    description: ' First CC Event',
    remarks: undefined,
    venue: 'Dataran F',
    startDate: moment(),
    endDate: moment().add(1, 'days'),
    fee: 0,
    requiredTransport: false,
    status: 'OPEN',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
  },
  {
    name: 'First CC Gathering',
    description: ' First CC Event',
    remarks: undefined,
    venue: 'Dataran F',
    startDate: moment(),
    endDate: moment().add(1, 'days'),
    fee: 0,
    requiredTransport: false,
    status: 'OPEN',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
  }
];

export class Events extends React.Component {
  renderedEvents = dummy.map(event => {
    return (
      <div className="my-3">
        <Card>
          <div>
            <div className="dflex">
              <div>
                <CardImg bottom width="10%" src={event.imageUrl} alt="Event image" />
              </div>
              <div>
                <CardTitle>{event.name}</CardTitle>
                <CardSubtitle>Date: {event.startDate.format('DD MMM YYYY')}</CardSubtitle>
                <CardSubtitle>Time: {event.startDate.format('h:mm a')}</CardSubtitle>
                <CardSubtitle>Venue: {event.venue}</CardSubtitle>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  });

  render() {
    return (
      <Container>
        <Row>
          <h1>Events</h1>
        </Row>
        <div>{this.renderedEvents}</div>
      </Container>
    );
  }
}

export default Events;
