import './event-crew.scss';

import React from 'react';
import { Button, Container } from 'reactstrap';
import EventModal from 'app/modules/events/event-modal';
import { CustomTab } from 'app/shared/components/customTab/custom-tab';
import { eventTabList } from 'app/shared/util/tab.constants';
import { IEventCrew, EventCrewRole } from 'app/shared/model/event-crew.model';
import { EventTable } from 'app/shared/components/eventTable/EventTable';
import { IEventAttendee } from 'app/shared/model/event-attendee.model';

const crewList: IEventCrew[] = [
  { id: 1, name: 'Chan Ka Chun', role: EventCrewRole.HEAD, contactNumber: '12345' },
  { id: 2, name: 'Clement Saw', role: EventCrewRole.HEAD, contactNumber: '33345' },
  { id: 3, name: 'Lu Xianze', role: EventCrewRole.HEAD, contactNumber: '88334' },
  { id: 4, name: 'Yaw Jian Hao', role: EventCrewRole.HEAD, contactNumber: '32112' },
  { id: 5, name: 'Sia Sim Cheong', role: EventCrewRole.HEAD, contactNumber: '78231' }
];

const attendeeList: IEventAttendee[] = [
  { id: 1, name: 'Chan Ka Chun', year: 1, provideTransport: false, contactNumber: '12345' },
  { id: 2, name: 'Clement Saw', year: 1, provideTransport: true, contactNumber: '33345' },
  { id: 3, name: 'Lu Xianze', year: 1, provideTransport: true, contactNumber: '88334' },
  { id: 4, name: 'Yaw Jian Hao', year: 1, provideTransport: true, contactNumber: '32112' },
  { id: 5, name: 'Sia Sim Cheong', year: 1, provideTransport: false, contactNumber: '78231' }
];

class Frame extends React.Component {
  state = { modalIsOpen: false, eventId: null };

  openModal = eventId => {
    this.setState({ modalIsOpen: true, eventId });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, eventId: null });
  };

  render() {
    return (
      <Container>
        <EventModal isOpen={this.state.modalIsOpen} eventId={this.state.eventId} toggleModal={this.closeModal} />
        <h1>Events</h1>
        <div className="my-4">
          <CustomTab currentTab="Crews" tabList={eventTabList} />
        </div>
        <Button color="action" className="w-100 mb-4">
          Add
        </Button>
        <EventTable users={crewList} openModal={this.openModal} />
      </Container>
    );
  }
}

{
  eventCrewList.map((eventCrew, i) => (
    <tr key={`entity-${i}`}>
      <td>
        <Button tag={Link} to={`${match.url}/${eventCrew.id}`} color="link" size="sm">
          {eventCrew.id}
        </Button>
      </td>
      <td>{eventCrew.userId}</td>
      <td>{eventCrew.eventId}</td>
      <td>
        <Translate contentKey={`clubmanagementApp.EventCrewRole.${eventCrew.role}`} />
      </td>
      <td className="text-right">
        <div className="btn-group flex-btn-group-container">
          <Button tag={Link} to={`${match.url}/${eventCrew.id}`} color="info" size="sm">
            <FontAwesomeIcon icon="eye" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.view">View</Translate>
            </span>
          </Button>
          <Button tag={Link} to={`${match.url}/${eventCrew.id}/edit`} color="primary" size="sm">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
          <Button tag={Link} to={`${match.url}/${eventCrew.id}/delete`} color="danger" size="sm">
            <FontAwesomeIcon icon="trash" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.delete">Delete</Translate>
            </span>
          </Button>
        </div>
      </td>
    </tr>
  ));
}

export default Frame;
