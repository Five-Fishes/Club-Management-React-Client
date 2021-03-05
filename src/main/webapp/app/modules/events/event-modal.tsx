import React from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import './event-modal.scss';
export interface IEventModalProps extends RouteComponentProps {
  isOpen: Boolean;
  toggleModal: Function;
  eventId: number;
}

class EventModal extends React.Component<IEventModalProps> {
  render() {
    return (
      <Modal size="sm" centered isOpen={this.props.isOpen}>
        <ModalHeader toggle={this.props.toggleModal} className="event-modal-header" />
        <ModalBody className="event-modal-body">
          <h2 className="text-center">Options</h2>
          <div className="d-flex flex-column mt-4">
            <Button onClick={() => this.props.history.push(`/update/${this.props.eventId}`)} color="secondary">
              Update
            </Button>
            <br />
            <Button color="cancel"> Delete </Button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default withRouter(EventModal);
