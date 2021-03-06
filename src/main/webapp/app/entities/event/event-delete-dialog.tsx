import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IEvent } from 'app/shared/model/event.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './event.reducer';
import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';

export interface IEventDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EventDeleteDialog extends React.Component<IEventDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.props.deleteEntity(this.props.eventEntity.id);
    this.handleClose(event);
  };

  handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { eventEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose} centered>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="clubmanagementApp.event.delete.question">
          <Translate contentKey="clubmanagementApp.event.delete.question" interpolate={{ id: eventEntity.id }}>
            Are you sure you want to delete this Event?
          </Translate>
        </ModalBody>
        <ModalFooter clasName="mx-3">
          <Button className="mr-auto" color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <AuthorizationChecker>
            {/* no one can delete for now */}
            <Button id="jhi-confirm-delete-event" color="danger" onClick={this.confirmDelete}>
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

const mapStateToProps = ({ event }: IRootState) => ({
  eventEntity: event.entity,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventDeleteDialog);
