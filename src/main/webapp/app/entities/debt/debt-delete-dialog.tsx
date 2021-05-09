import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IDebt } from 'app/shared/model/debt.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './debt.reducer';

export interface IDebtDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DebtDeleteDialog extends React.Component<IDebtDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.props.deleteEntity(this.props.debtEntity.id);
    this.handleClose(event);
  };

  handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { debtEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="clubmanagementApp.debt.delete.question">
          <Translate contentKey="clubmanagementApp.debt.delete.question" interpolate={{ id: debtEntity.id }}>
            Are you sure you want to delete this Debt?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-debt" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ debt }: IRootState) => ({
  debtEntity: debt.entity,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DebtDeleteDialog);
