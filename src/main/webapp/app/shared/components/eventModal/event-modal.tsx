import React from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import AuthorizationChecker, { IAuthorizationCheckerOwnProps } from 'app/shared/components/authorization-checker/authorization-checker';

import './event-modal.scss';
export interface IEventModalProps extends RouteComponentProps {
  isOpen: boolean;
  toggleModal: React.MouseEventHandler<any>;
  updatePath?: string;
  deletePath?: string;
  updateBtnAuthorizationProps?: IAuthorizationCheckerOwnProps;
  deleteBtnAuthorizationProps?: IAuthorizationCheckerOwnProps;
}

class EventModal extends React.Component<IEventModalProps> {
  render() {
    const { isOpen, toggleModal, updatePath, deletePath, updateBtnAuthorizationProps, deleteBtnAuthorizationProps } = this.props;
    return (
      <Modal size="sm" centered isOpen={isOpen}>
        <ModalHeader toggle={toggleModal} className="event-modal-header" />
        <ModalBody className="event-modal-body">
          <h2 className="text-center">
            <Translate contentKey="global.menu.entities.options">Options</Translate>{' '}
          </h2>
          <div className="d-flex flex-column mt-4">
            <AuthorizationChecker {...updateBtnAuthorizationProps}>
              {updatePath && (
                <Button tag={Link} to={updatePath} color="secondary">
                  <Translate contentKey="entity.action.update">Update</Translate>
                </Button>
              )}
            </AuthorizationChecker>
            <br />
            <AuthorizationChecker {...deleteBtnAuthorizationProps}>
              {deletePath && (
                <Button tag={Link} to={deletePath} color="cancel">
                  <Translate contentKey="entity.action.delete">Delete</Translate>
                </Button>
              )}
            </AuthorizationChecker>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default withRouter(EventModal);
