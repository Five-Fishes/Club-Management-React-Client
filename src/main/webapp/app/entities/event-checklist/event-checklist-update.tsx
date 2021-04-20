import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './event-checklist.reducer';
import { IEventChecklist } from 'app/shared/model/event-checklist.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import './eventChecklist.scss';
import '../../styles/event-module.scss';

export interface IEventChecklistUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string; eventId: string }> {}

export interface IEventChecklistUpdateState {
  isNew: boolean;
  eventId: string;
}

export class EventChecklistUpdate extends React.Component<IEventChecklistUpdateProps, IEventChecklistUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      eventId: this.props.match.params.eventId
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { eventChecklistEntity } = this.props;
      const entity = {
        ...eventChecklistEntity,
        ...values
      };
      entity.eventId = this.state.eventId;

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.props.history.push(`/entity/event-checklist/event/${this.state.eventId}`);
    }
  };

  handleClose = () => {
    this.props.history.push(`/entity/event-checklist/event/${this.state.eventId}`);
  };

  render() {
    const { eventChecklistEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { description } = eventChecklistEntity;

    return (
      <div className="mx-3">
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.eventChecklist.home.createOrEditLabel" className="event-module-form-heading">
              <Translate contentKey="clubmanagementApp.eventChecklist.home.createOrEditLabel">Create or edit a EventChecklist</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : eventChecklistEntity} onSubmit={this.saveEntity}>
                <AvGroup>
                  <Label id="nameLabel" for="event-checklist-name">
                    <Translate contentKey="clubmanagementApp.eventChecklist.name">Name</Translate>
                  </Label>
                  <AvField id="event-checklist-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="event-checklist-description">
                    <Translate contentKey="clubmanagementApp.eventChecklist.description">Description</Translate>
                  </Label>
                  <AvInput id="event-checklist-description" type="textarea" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="event-checklist-status">
                    <Translate contentKey="clubmanagementApp.eventChecklist.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="event-checklist-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && eventChecklistEntity.status) || 'OPEN'}
                  >
                    <option value="OPEN">{translate('clubmanagementApp.EventChecklistStatus.OPEN')}</option>
                    <option value="IN_PROGRESS">{translate('clubmanagementApp.EventChecklistStatus.IN_PROGRESS')}</option>
                    <option value="FINISHED">{translate('clubmanagementApp.EventChecklistStatus.FINISHED')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="event-checklist-type">
                    <Translate contentKey="clubmanagementApp.eventChecklist.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="event-checklist-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && eventChecklistEntity.type) || 'PREPARATION'}
                  >
                    <option value="PREPARATION">{translate('clubmanagementApp.EventChecklistType.PREPARATION')}</option>
                    <option value="PURCHASE">{translate('clubmanagementApp.EventChecklistType.PURCHASE')}</option>
                  </AvInput>
                </AvGroup>
                <div className="general-buttonContainer--flexContainer">
                  <Button
                    className="general-button--width"
                    tag={Link}
                    id="cancel-save"
                    to={`/entity/event-checklist/event/${this.state.eventId}`}
                    replace
                    color="cancel"
                  >
                    <Translate contentKey="entity.action.cancel">Cancel</Translate>
                  </Button>
                  <Button className="general-button--width" color="action" id="save-entity" type="submit" disabled={updating}>
                    {isNew ? (
                      <Translate contentKey="entity.action.create">Create</Translate>
                    ) : (
                      <Translate contentKey="entity.action.update">Update</Translate>
                    )}
                  </Button>
                </div>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  eventChecklistEntity: storeState.eventChecklist.entity,
  loading: storeState.eventChecklist.loading,
  updating: storeState.eventChecklist.updating,
  updateSuccess: storeState.eventChecklist.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventChecklistUpdate);
