import React from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';

import './event-modal.scss';
export interface IEventModalProps extends RouteComponentProps {
  isOpen: boolean;
  toggleModal: Function;
  updatePath: string;
  deletePath: string;
  eventId: number;
  updateCCRole?: CCRole;
  updateEventRole?: EventRole;
  deleteCCRole?: CCRole;
  deleteEventRole?: EventRole;
}

class EventModal extends React.Component<IEventModalProps> {
  render() {
    const {
      isOpen,
      toggleModal,
      updatePath,
      deletePath,
      eventId,
      updateCCRole,
      updateEventRole,
      deleteCCRole,
      deleteEventRole
    } = this.props;
    return (
      <Modal size="sm" centered isOpen={isOpen}>
        <ModalHeader toggle={toggleModal} className="event-modal-header" />
        <ModalBody className="event-modal-body">
          <h2 className="text-center">
            <Translate contentKey="global.menu.entities.options">Options</Translate>{' '}
          </h2>
          <div className="d-flex flex-column mt-4">
            <AuthorizationChecker ccRole={updateCCRole} eventRole={updateEventRole} eventId={eventId}>
              <Button tag={Link} to={updatePath} color="secondary">
                <Translate contentKey="entity.action.update">Update</Translate>
              </Button>
            </AuthorizationChecker>
            <br />
            <AuthorizationChecker ccRole={deleteCCRole} eventRole={deleteEventRole} eventId={eventId}>
              <Button tag={Link} to={deletePath} color="cancel">
                <Translate contentKey="entity.action.delete">Delete</Translate>
              </Button>
            </AuthorizationChecker>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default withRouter(EventModal);
