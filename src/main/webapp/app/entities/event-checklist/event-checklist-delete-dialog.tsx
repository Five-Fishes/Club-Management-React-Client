import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IEventChecklist } from 'app/shared/model/event-checklist.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './event-checklist.reducer';
import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';

export interface IEventChecklistDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EventChecklistDeleteDialog extends React.Component<IEventChecklistDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.eventChecklistEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { eventChecklistEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose} centered>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="clubmanagementApp.eventChecklist.delete.question" className="text-center">
          <Translate contentKey="clubmanagementApp.eventChecklist.delete.question" interpolate={{ id: eventChecklistEntity.id }}>
            Are you sure you want to delete this EventChecklist?
          </Translate>
        </ModalBody>
        <ModalFooter clasName="mx-3">
          <Button className="mr-auto" color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.CREW} eventId={eventChecklistEntity.eventId}>
            <Button id="jhi-confirm-delete-eventChecklist" color="danger" onClick={this.confirmDelete}>
              <FontAwesomeIcon icon="trash" />
              &nbsp;
              <Translate contentKey="entity.action.delete">Delete</Translate>
            </Button>
          </AuthorizationChecker>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ eventChecklist }: IRootState) => ({
  eventChecklistEntity: eventChecklist.entity,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventChecklistDeleteDialog);
