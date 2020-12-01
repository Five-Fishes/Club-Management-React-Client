import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './event.reducer';
import { IEvent } from 'app/shared/model/event.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEventUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEventUpdateState {
  isNew: boolean;
}

export class EventUpdate extends React.Component<IEventUpdateProps, IEventUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
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
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const { eventEntity } = this.props;
      const entity = {
        ...eventEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/event');
  };

  render() {
    const { eventEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { description } = eventEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.event.home.createOrEditLabel">
              <Translate contentKey="clubmanagementApp.event.home.createOrEditLabel">Create or edit a Event</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : eventEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="event-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="event-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
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
                    <AvInput id="event-requiredTransport" type="checkbox" className="form-control" name="requiredTransport" />
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
                <AvGroup>
                  <Label id="imageUrlLabel" for="event-imageUrl">
                    <Translate contentKey="clubmanagementApp.event.imageUrl">Image Url</Translate>
                  </Label>
                  <AvField id="event-imageUrl" type="text" name="imageUrl" />
                </AvGroup>
                <AvGroup>
                  <Label id="fileNameLabel" for="event-fileName">
                    <Translate contentKey="clubmanagementApp.event.fileName">File Name</Translate>
                  </Label>
                  <AvField id="event-fileName" type="text" name="fileName" />
                </AvGroup>
                <AvGroup>
                  <Label id="fileTypeLabel" for="event-fileType">
                    <Translate contentKey="clubmanagementApp.event.fileType">File Type</Translate>
                  </Label>
                  <AvField id="event-fileType" type="text" name="fileType" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/event" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
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
  updateSuccess: storeState.event.updateSuccess
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
)(EventUpdate);
