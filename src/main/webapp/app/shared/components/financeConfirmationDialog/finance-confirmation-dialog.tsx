import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';

export interface IDebtCollectDialogProps extends RouteComponentProps<{ id: string }> {
  isOpen: boolean;
  entityType: string;
  action: string;
  confirmQuestion: string;
  confirmButtonColor: string;
  confirmActionCallback: () => void;
  toggleModal: () => void;
}

export class FinanceConfirmationDialog extends React.Component<IDebtCollectDialogProps> {
  render() {
    const { isOpen, toggleModal, entityType, action, confirmQuestion, confirmButtonColor, confirmActionCallback } = this.props;
    const { id } = this.props.match.params;
    return (
      <Modal size="sm" centered isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <Translate contentKey={`clubmanagementApp.${entityType}.${action}.title`}>Confirm collect operation</Translate>
        </ModalHeader>
        <ModalBody id={`clubmanagementApp.${entityType}.${action}.question`}>
          <Translate contentKey={`clubmanagementApp.${entityType}.${action}.question`} interpolate={{ id: { id } }}>
            {confirmQuestion}
          </Translate>
        </ModalBody>
        <ModalFooter className="justify-content-between mx-3">
          <Button color="secondary" onClick={toggleModal}>
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id={`jhi-confirm-${action}-${entityType}`} color={confirmButtonColor} onClick={confirmActionCallback}>
            <Translate contentKey={`entity.action.${action}`}>{action}</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default withRouter(FinanceConfirmationDialog);
