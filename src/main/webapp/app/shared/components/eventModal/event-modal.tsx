import React from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Translate } from 'react-jhipster';

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
          <h2 className="text-center">
            <Translate contentKey="global.menu.entities.options">Options</Translate>{' '}
          </h2>
          <div className="d-flex flex-column mt-4">
            <Button tag={Link} to={this.props.updatePath} color="secondary">
              <Translate contentKey="entity.action.update">Update</Translate>
            </Button>
            <br />
            <Button tag={Link} to={this.props.deletePath} color="cancel">
              <Translate contentKey="entity.action.delete">Delete</Translate>
            </Button>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default withRouter(EventModal);
