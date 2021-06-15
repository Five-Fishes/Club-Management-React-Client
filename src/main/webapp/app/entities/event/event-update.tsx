import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, setFileData } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './event.reducer';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import './events.scss';
import '../../styles/event-module.scss';
import { IEvent } from 'app/shared/model/event.model';

export interface IEventUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEventUpdateState {
  isNew: boolean;
  eventImageFile?: File;
}

export class EventUpdate extends React.Component<IEventUpdateProps, IEventUpdateState> {
  constructor(props: IEventUpdateProps) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      eventImageFile: undefined,
    };
    this.convertToFormData = this.convertToFormData.bind(this);
    this.eventImageChange = this.eventImageChange.bind(this);
  }

  componentWillUpdate(nextProps: IEventUpdateProps, nextState: IEventUpdateState) {
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

  saveEntity = (event: any, errors: any, values: any) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const { eventEntity } = this.props;
      const entity = {
        ...eventEntity,
        ...values,
        imageFile: this.state.eventImageFile,
      };
      const entityFormData = this.convertToFormData(entity);

      if (this.state.isNew) {
        this.props.createEntity(entityFormData);
      } else {
        this.props.updateEntity(entityFormData);
      }
    }
  };

  convertToFormData(eventEntity: IEvent): FormData {
    const formData = new FormData();
    formData.append('name', eventEntity.name ?? '');
    formData.append('description', eventEntity.description ?? '');
    formData.append('remarks', eventEntity.remarks ?? '');
    formData.append('venue', eventEntity.venue ?? '');
    formData.append('startDate', eventEntity.startDate?.toISOString() ?? '');
    formData.append('endDate', eventEntity.endDate?.toISOString() ?? '');
    formData.append('fee', String(eventEntity.fee) ?? '');
    formData.append('requiredTransport', String(eventEntity.requiredTransport) ?? '');
    formData.append('status', eventEntity.status ?? '');
    if (eventEntity.imageFile !== undefined && eventEntity.imageFile.size > 0) {
      formData.append('multipartFile', eventEntity.imageFile);
    }
    if (!this.state.isNew) {
      formData.append('id', String(eventEntity.id) ?? '');
    }
    return formData;
  }

  eventImageChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files?.length > 0) {
      this.setState({
        ...this.state,
        eventImageFile: files[0],
      });
    } else {
      this.setState({
        ...this.state,
        eventImageFile: undefined,
      });
    }
  }

  handleClose = () => {
    this.props.history.push('/entity/event');
  };

  render() {
    const { eventEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { description } = eventEntity;

    return (
      <div className="mx-3">
        <Row className="justify-content-center">
          <Col md="8">
            {isNew ? (
              <h2 id="clubmanagementApp.event.home.createOrEditLabel" className="event-module-form-heading">
                <Translate contentKey="clubmanagementApp.event.home.createLabel">Create New Event</Translate>
              </h2>
            ) : (
              <h2 id="clubmanagementApp.event.home.createOrEditLabel" className="event-module-form-heading">
                <Translate contentKey="clubmanagementApp.event.home.editLabel">Edit an Event</Translate>
              </h2>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center event-bottom-padding">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : eventEntity} onSubmit={this.saveEntity}>
                <AvGroup>
                  <Label id="nameLabel" for="event-name">
                    <Translate contentKey="clubmanagementApp.event.name">Name</Translate>
                  </Label>
                  <AvField id="event-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="event-description">
                    <Translate contentKey="clubmanagementApp.event.description">Description</Translate>
                  </Label>
                  <AvInput id="event-description" type="textarea" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="remarksLabel" for="event-remarks">
                    <Translate contentKey="clubmanagementApp.event.remarks">Remarks</Translate>
                  </Label>
                  <AvField id="event-remarks" type="text" name="remarks" />
                </AvGroup>
                <AvGroup>
                  <Label id="venueLabel" for="event-venue">
                    <Translate contentKey="clubmanagementApp.event.venue">Venue</Translate>
                  </Label>
                  <AvField id="event-venue" type="text" name="venue" />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="event-startDate">
                    <Translate contentKey="clubmanagementApp.event.startDate">Start Date</Translate>
                  </Label>
                  <AvInput
                    id="event-startDate"
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.eventEntity.startDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="event-endDate">
                    <Translate contentKey="clubmanagementApp.event.endDate">End Date</Translate>
                  </Label>
                  <AvInput
                    id="event-endDate"
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.eventEntity.endDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="feeLabel" for="event-fee">
                    <Translate contentKey="clubmanagementApp.event.fee">Fee</Translate>
                  </Label>
                  <AvField id="event-fee" type="text" name="fee" />
                </AvGroup>
                <AvGroup>
                  <Label id="requiredTransportLabel" check>
                    <AvInput
                      id="event-requiredTransport"
                      type="checkbox"
                      className="form-control event-checkbox"
                      name="requiredTransport"
                    />
                    <Translate contentKey="clubmanagementApp.event.requiredTransport">Required Transport</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="event-status">
                    <Translate contentKey="clubmanagementApp.event.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="event-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && eventEntity.status) || 'OPEN'}
                  >
                    <option value="OPEN">{translate('clubmanagementApp.EventStatus.OPEN')}</option>
                    <option value="POSTPONED">{translate('clubmanagementApp.EventStatus.POSTPONED')}</option>
                    <option value="CANCELLED">{translate('clubmanagementApp.EventStatus.CANCELLED')}</option>
                  </AvInput>
                </AvGroup>
                {/* <AvGroup>
                  <Label id="imageUrlLabel" for="event-imageUrl">
                    <Translate contentKey="clubmanagementApp.event.imageUrl">Image</Translate>
                  </Label>
                  <AvField id="event-imageUrl" type="text" name="imageUrl" />
                </AvGroup> */}
                <AvGroup>
                  <Label id="eventImageFileLabel" for="event-image-file">
                    <Translate contentKey="clubmanagementApp.event.imageFile">Image</Translate>
                  </Label>
                  <input id="event-image-file" name="imageFile" type="file" accept="image/*" onChange={this.eventImageChange} />
                </AvGroup>
                <div className="general-buttonContainer--flexContainer">
                  <Button className="general-button--width" tag={Link} id="cancel-save" to="/entity/event" replace color="cancel">
                    <Translate contentKey="entity.action.cancel">Cancel</Translate>
                  </Button>
                  &nbsp;
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
  eventEntity: storeState.event.entity,
  loading: storeState.event.loading,
  updating: storeState.event.updating,
  updateSuccess: storeState.event.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventUpdate);
