import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IEventCrew } from 'app/shared/model/event-crew.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity, deleteEntityWithEventId } from './event-crew.reducer';

export interface IEventCrewDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string; eventId: string }> {}

export class EventCrewDeleteDialog extends React.Component<IEventCrewDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id, this.props.match.params.eventId);
  }

  confirmDelete = event => {
    this.props.deleteEntityWithEventId(this.props.eventCrewEntity.id, this.props.match.params.eventId);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { eventCrewEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="clubmanagementApp.eventCrew.delete.question">
          <Translate contentKey="clubmanagementApp.eventCrew.delete.question" interpolate={{ id: eventCrewEntity.id }}>
            Are you sure you want to delete this EventCrew?
          </Translate>
        </ModalBody>
        <ModalFooter className="justify-content-between mx-3">
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-eventCrew" color="cancel" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ eventCrew }: IRootState) => ({
  eventCrewEntity: eventCrew.entity
});

const mapDispatchToProps = { getEntity, deleteEntity, deleteEntityWithEventId };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventCrewDeleteDialog);
