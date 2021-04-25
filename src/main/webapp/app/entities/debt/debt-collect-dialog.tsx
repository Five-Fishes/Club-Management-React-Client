import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';

import { DebtStatus } from 'app/shared/model/debt.model';
import { IRootState } from 'app/shared/reducers';
import { updateEntityStatus } from './debt.reducer';

export interface IDebtCollectDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DebtCollectDialog extends React.Component<IDebtCollectDialogProps> {
  componentDidMount() {}

  confirmCollect = event => {
    this.props.updateEntityStatus(this.props.match.params.id, DebtStatus.COLLECTED);
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
          <Translate contentKey="clubmanagementApp.debt.collect.title">Confirm collect operation</Translate>
        </ModalHeader>
        <ModalBody id="clubmanagementApp.debt.collect.question">
          <Translate contentKey="clubmanagementApp.debt.collect.question" interpolate={{ id: this.props.match.params.id }}>
            Are you sure you want to change status of this Debt as collected?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-collect-debt" color="success" onClick={this.confirmCollect}>
            <Translate contentKey="entity.action.collect">Collect</Translate>
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
)(DebtCollectDialog);
