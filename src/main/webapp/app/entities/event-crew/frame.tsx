import './event-crew.scss';

import React from 'react';
import { Button, Container, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EventModal from 'app/modules/events/event-modal';
import { CustomTab } from 'app/shared/components/customTab/custom-tab';
import { eventTabList } from 'app/shared/util/tab.constants';

const UserList = [
  { id: 1, name: 'Chan Ka Chun', role: 'Head', provideTransport: false, contactNumber: '12345' },
  { id: 2, name: 'Clement Saw', role: 'Activity', provideTransport: true, contactNumber: '33345' },
  { id: 3, name: 'Lu Xianze', role: 'Publicity', provideTransport: true, contactNumber: '88334' },
  { id: 4, name: 'Yaw Jian Hao', role: 'Logistic', provideTransport: true, contactNumber: '32112' },
  { id: 5, name: 'Sia Sim Cheong', role: 'Registration', provideTransport: false, contactNumber: '78231' }
];

class Frame extends React.Component {
  state = { modalIsOpen: false, eventId: null };

  tableList = UserList.map((user, index) => {
    const onHandleClick = () => {
      this.contactUser(user.contactNumber);
    };

    const onToggleModal = () => this.openModal(user.id);

    return (
      <tr key={user.id}>
        <td scope="row">{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.role}</td>
        <td>{user.provideTransport ? <FontAwesomeIcon icon="car" /> : null}</td>
        <td>
          <Button color="Link" className="icon-btn" onClick={onHandleClick}>
            <FontAwesomeIcon icon={['fab', 'whatsapp-square']} color="#25D366" size="lg" />
          </Button>
        </td>
        <td>
          <Button onClick={onToggleModal} color="Link" className="icon-btn">
            <FontAwesomeIcon icon="ellipsis-v" color="#07ade1" />
          </Button>
        </td>
      </tr>
    );
  });

  openModal = eventId => {
    this.setState({ modalIsOpen: true, eventId });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, eventId: null });
  };

  contactUser = contactNumber => {
    window.open(`https://wa.me/${contactNumber}`, '_blank');
  };

  render() {
    return (
      <Container>
        <EventModal isOpen={this.state.modalIsOpen} eventId={this.state.eventId} toggleModal={this.closeModal} />
        <h1>Events</h1>
        <div className="my-4">
          <CustomTab currentTab="Crews" tabList={eventTabList} />
        </div>
        <Button color="action" className="w-100">
          Add
        </Button>
        <Table responsive size="sm" className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th />
              <th />
              <th />
            </tr>
          </thead>
          {this.tableList}
        </Table>
      </Container>
    );
  }
}

export default Frame;
