import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FinanceActionButton } from 'app/shared/components/finance-action-button/finance-action-button';

export interface IDebtCollectDialogProps {
  transactionId?: number;
  isOpen: boolean;
  entityType: string;
  action: string;
  confirmQuestion: string;
  confirmButtonName: string;
  confirmButtonColor: string;
  confirmActionCallback: () => void;
  toggleModal: () => void;
}

export class FinanceConfirmationDialog extends React.Component<IDebtCollectDialogProps> {
  render() {
    const {
      transactionId,
      isOpen,
      toggleModal,
      entityType,
      action,
      confirmQuestion,
      confirmButtonName,
      confirmButtonColor,
      confirmActionCallback,
    } = this.props;
    return (
      <Modal size="sm" centered isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <Translate contentKey={`clubmanagementApp.${entityType}.${action}.title`}>Confirm {action} operation</Translate>
        </ModalHeader>
        <ModalBody id={`clubmanagementApp.${entityType}.${action}.question`}>
          <Translate contentKey={`clubmanagementApp.${entityType}.${action}.question`} interpolate={{ id: { transactionId } }}>
            {confirmQuestion}
          </Translate>
        </ModalBody>
        <ModalFooter className="justify-content-between mx-3">
          <FinanceActionButton
            name={<Translate contentKey="entity.action.cancel">Cancel</Translate>}
            color="secondary"
            onClick={toggleModal}
          />
          <FinanceActionButton
            name={<Translate contentKey={`entity.action.${action}`}>{confirmButtonName}</Translate>}
            color={confirmButtonColor}
            onClick={confirmActionCallback}
          />
        </ModalFooter>
      </Modal>
    );
  }
}

export default FinanceConfirmationDialog;
