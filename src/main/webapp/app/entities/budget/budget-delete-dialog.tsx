import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './budget.reducer';

export interface IBudgetDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string; eventId: string }> {}

export class BudgetDeleteDialog extends React.Component<IBudgetDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id, this.props.match.params.eventId);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.budgetEntity.id, this.props.budgetEntity.eventId);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { budgetEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="clubmanagementApp.eventBudget.delete.question">
          <Translate contentKey="clubmanagementApp.eventBudget.delete.question" interpolate={{ id: budgetEntity.id }}>
            Are you sure you want to delete this Budget?
          </Translate>
        </ModalBody>
        <ModalFooter clasName="justify-content-between mx-3">
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-budget" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ budget }: IRootState) => ({
  budgetEntity: budget.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetDeleteDialog);
