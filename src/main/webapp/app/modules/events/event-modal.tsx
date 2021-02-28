import React from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './event-modal.css';
export interface IEventModalProps {
  isOpen: Boolean;
  toggleModal: Function;
}

class EventModal extends React.Component<IEventModalProps> {
  render() {
    return (
      <Modal size="sm" centered isOpen={this.props.isOpen}>
        <ModalHeader toggle={this.props.toggleModal} className="event-modal-header" />
        <ModalBody className="event-modal-body">
          <h2 className="text-center">Options</h2>
          <div className="d-flex flex-column mt-4">
            <Button color="secondary"> Update </Button>
            <br />
            <Button color="cancel"> Delete </Button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default EventModal;
