import React from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import './event-modal.scss';
export interface IEventModalProps extends RouteComponentProps {
  isOpen: Boolean;
  toggleModal: Function;
  updatePath: String;
  deletePath: String;
}

class EventModal extends React.Component<IEventModalProps> {
  render() {
    return (
      <Modal size="sm" centered isOpen={this.props.isOpen}>
        <ModalHeader toggle={this.props.toggleModal} className="event-modal-header" />
        <ModalBody className="event-modal-body">
          <h2 className="text-center">Options</h2>
          <div className="d-flex flex-column mt-4">
            <Button tag={Link} to={this.props.updatePath} color="secondary">
              Update
            </Button>
            <br />
            <Button tag={Link} to={this.props.deletePath} color="cancel">
              Delete
            </Button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default withRouter(EventModal);
