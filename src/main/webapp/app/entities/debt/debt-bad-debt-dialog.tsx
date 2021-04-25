import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';

import { DebtStatus } from 'app/shared/model/debt.model';
import { IRootState } from 'app/shared/reducers';
import { updateEntityStatus } from './debt.reducer';

export interface IDebtBadDebtDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DebtBadDebtDialog extends React.Component<IDebtBadDebtDialogProps> {
  componentDidMount() {}

  confirmBadDebt = event => {
    this.props.updateEntityStatus(this.props.match.params.id, DebtStatus.UNREACHABLE);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="clubmanagementApp.debt.badDebt.title">Confirm bad debt operation</Translate>
        </ModalHeader>
        <ModalBody id="clubmanagementApp.debt.badDebt.question">
          <Translate contentKey="clubmanagementApp.debt.badDebt.question" interpolate={{ id: this.props.match.params.id }}>
            Are you sure you want to change status of this Debt as bad debt?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-bad-debt" color="danger" onClick={this.confirmBadDebt}>
            <Translate contentKey="entity.action.badDebt">Bad Debt</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ debt }: IRootState) => ({
  debtEntity: debt.entity
});

const mapDispatchToProps = { updateEntityStatus };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DebtBadDebtDialog);
