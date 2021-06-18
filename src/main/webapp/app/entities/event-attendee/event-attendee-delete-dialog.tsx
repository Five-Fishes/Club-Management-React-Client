import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IEventAttendee } from 'app/shared/model/event-attendee.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './event-attendee.reducer';
import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';

export interface IEventAttendeeDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ attendeeId: string }> {}

export class EventAttendeeDeleteDialog extends React.Component<IEventAttendeeDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.attendeeId);
  }

  confirmDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.props.deleteEntity(this.props.eventAttendeeEntity.id);
    this.handleClose(event);
  };

  handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { eventAttendeeEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose} centered>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="clubmanagementApp.eventAttendee.delete.question">
          <Translate contentKey="clubmanagementApp.eventAttendee.delete.question">Are you sure you want to unregister?</Translate>
        </ModalBody>
        <ModalFooter clasName="justify-content-between mx-3">
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.no">No</Translate>
          </Button>
          <Button id="jhi-confirm-delete-eventAttendee" color="cancel" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.yes">Yes</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ eventAttendee }: IRootState) => ({
  eventAttendeeEntity: eventAttendee.entity,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventAttendeeDeleteDialog);
