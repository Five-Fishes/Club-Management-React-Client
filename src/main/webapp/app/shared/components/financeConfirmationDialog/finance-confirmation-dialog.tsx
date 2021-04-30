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
    return (
      <Modal size="sm" centered isOpen={this.props.isOpen} toggle={this.props.toggleModal}>
        <ModalHeader toggle={this.props.toggleModal}>
          <Translate contentKey={`clubmanagementApp.${this.props.entityType}.${this.props.action}.title`}>
            Confirm collect operation
          </Translate>
        </ModalHeader>
        <ModalBody id={`clubmanagementApp.${this.props.entityType}.${this.props.action}.question`}>
          <Translate
            contentKey={`clubmanagementApp.${this.props.entityType}.${this.props.action}.question`}
            interpolate={{ id: this.props.match.params.id }}
          >
            {this.props.confirmQuestion}
          </Translate>
        </ModalBody>
        <ModalFooter className="justify-content-between mx-3">
          <Button color="secondary" onClick={this.props.toggleModal}>
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button
            id={`jhi-confirm-${this.props.action}-${this.props.entityType}`}
            color={this.props.confirmButtonColor}
            onClick={this.props.confirmActionCallback}
          >
            <Translate contentKey={`entity.action.${this.props.action}`}>{this.props.action}</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default withRouter(FinanceConfirmationDialog);
