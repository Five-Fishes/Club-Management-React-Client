import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IEventActivity } from 'app/shared/model/event-activity.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './event-activity.reducer';
import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';

export interface IEventActivityDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string; eventId: string }> {}

export class EventActivityDeleteDialog extends React.Component<IEventActivityDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id, this.props.match.params.eventId);
  }

  confirmDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.props.deleteEntity(this.props.match.params.id, this.props.match.params.eventId);
    this.handleClose(event);
  };

  handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { eventActivityEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose} centered>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="clubmanagementApp.eventActivity.delete.question" className="text-center">
          <Translate contentKey="clubmanagementApp.eventActivity.delete.question" interpolate={{ id: eventActivityEntity.name }}>
            Are you sure you want to delete this EventActivity?
          </Translate>
        </ModalBody>
        <ModalFooter className="mx-3">
          <Button className="mr-auto" color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.CREW} eventId={eventActivityEntity.eventId}>
            <Button id="jhi-confirm-delete-eventActivity" color="cancel" onClick={this.confirmDelete}>
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

const mapStateToProps = ({ eventActivity }: IRootState) => ({
  eventActivityEntity: eventActivity.entity,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventActivityDeleteDialog);
