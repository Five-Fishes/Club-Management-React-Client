import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './event-activity.reducer';
import { IEventActivity } from 'app/shared/model/event-activity.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEventActivityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEventActivityUpdateState {
  isNew: boolean;
}

export class EventActivityUpdate extends React.Component<IEventActivityUpdateProps, IEventActivityUpdateState> {
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

    if (errors.length === 0) {
      const { eventActivityEntity } = this.props;
      const entity = {
        ...eventActivityEntity,
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
    this.props.history.push('/entity/event-activity');
  };

  render() {
    const { eventActivityEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { description } = eventActivityEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.eventActivity.home.createOrEditLabel">
              <Translate contentKey="clubmanagementApp.eventActivity.home.createOrEditLabel">Create or edit a EventActivity</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : eventActivityEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="event-activity-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="event-activity-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="eventIdLabel" for="event-activity-eventId">
                    <Translate contentKey="clubmanagementApp.eventActivity.eventId">Event Id</Translate>
                  </Label>
                  <AvField id="event-activity-eventId" type="string" className="form-control" name="eventId" />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="event-activity-startDate">
                    <Translate contentKey="clubmanagementApp.eventActivity.startDate">Start Date</Translate>
                  </Label>
                  <AvInput
                    id="event-activity-startDate"
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.eventActivityEntity.startDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="durationInDayLabel" for="event-activity-durationInDay">
                    <Translate contentKey="clubmanagementApp.eventActivity.durationInDay">Duration In Day</Translate>
                  </Label>
                  <AvField id="event-activity-durationInDay" type="text" name="durationInDay" />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="event-activity-name">
                    <Translate contentKey="clubmanagementApp.eventActivity.name">Name</Translate>
                  </Label>
                  <AvField id="event-activity-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="event-activity-description">
                    <Translate contentKey="clubmanagementApp.eventActivity.description">Description</Translate>
                  </Label>
                  <AvInput id="event-activity-description" type="textarea" name="description" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/event-activity" replace color="info">
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
  eventActivityEntity: storeState.eventActivity.entity,
  loading: storeState.eventActivity.loading,
  updating: storeState.eventActivity.updating,
  updateSuccess: storeState.eventActivity.updateSuccess
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
)(EventActivityUpdate);
