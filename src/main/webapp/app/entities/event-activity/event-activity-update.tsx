import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity } from './event-activity.reducer';
import { getEntity as getEventEntity } from '../event/event.reducer';

import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { APP_LOCAL_DATETIME_FORMAT } from 'app/config/constants';
import moment from 'moment';

export interface IEventActivityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string; eventId: string }> {}

export class EventActivityUpdate extends React.Component<IEventActivityUpdateProps> {
  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id, this.props.match.params.eventId);
    this.props.getEventEntity(this.props.match.params.eventId);
  }

  saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);

    if (errors.length === 0) {
      const { eventActivityEntity } = this.props;
      const entity = {
        ...eventActivityEntity,
        ...values
      };
      this.props.updateEntity(entity);
    }
  };

  handleClose = () => {
    this.props.history.push(`/entity/event-activity/event/${this.props.match.params.eventId}`);
  };

  render() {
    const { eventActivityEntity, loading, updating, errorMessage, eventEntity } = this.props;
    const { eventId } = this.props.match.params;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.eventActivity.home.createOrEditLabel">
              <Translate contentKey="clubmanagementApp.eventActivity.home.updateTitle">Update Event Activity</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={eventActivityEntity} onSubmit={this.saveEntity}>
                <AvGroup>
                  <Label id="nameLabel" for="event-activity-name">
                    <Translate contentKey="clubmanagementApp.eventActivity.name">Name</Translate>
                  </Label>
                  <AvField id="event-activity-name" type="text" name="name" />
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
                    placeholder={'YYYY-MM-DDTHH:mm'}
                    required
                    validate={{
                      dateRange: {
                        format: APP_LOCAL_DATETIME_FORMAT,
                        start: { value: moment().format(APP_LOCAL_DATETIME_FORMAT), errorMessage: 'Activity Date cannot early than today' },
                        end: {
                          value: eventEntity.hasOwnProperty('endDate') ? eventEntity.endDate : '2030-12-30T10:00',
                          errorMessage: 'Activity Date cannot later than Event Date'
                        }
                      }
                    }}
                    value={convertDateTimeFromServer(this.props.eventActivityEntity.startDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="durationInDayLabel" for="event-activity-durationInDay">
                    <Translate contentKey="clubmanagementApp.eventActivity.durationInDay">Duration In Day</Translate>
                  </Label>
                  <AvField id="event-activity-durationInDay" type="text" name="durationInDay" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="event-activity-description">
                    <Translate contentKey="clubmanagementApp.eventActivity.description">Description</Translate>
                  </Label>
                  <AvInput id="event-activity-description" type="textarea" name="description" />
                </AvGroup>
                <span className="text-error">{errorMessage ? errorMessage.response.data.detail : ''}</span>
                <div className="text-center mx-4 d-flex justify-content-between justify-content-md-center mb-2">
                  <Button tag={Link} id="cancel-save" to={`/entity/event-activity/event/${eventId}`} replace color="cancel">
                    <FontAwesomeIcon icon="arrow-left" />
                    &nbsp;
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </Button>
                  &nbsp;
                  <Button color="action" id="save-entity" type="submit" disabled={updating}>
                    <FontAwesomeIcon icon="save" />
                    &nbsp;
                    <Translate contentKey="entity.action.update">Update</Translate>
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
  eventActivityEntity: storeState.eventActivity.entity,
  loading: storeState.eventActivity.loading,
  updating: storeState.eventActivity.updating,
  updateSuccess: storeState.eventActivity.updateSuccess,
  errorMessage: storeState.eventActivity.errorMessage,
  eventEntity: storeState.event.entity
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  getEventEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventActivityUpdate);
