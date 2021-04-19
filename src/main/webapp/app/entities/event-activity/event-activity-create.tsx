import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { createEntity, reset } from './event-activity.reducer';
import { getEntity as getEventEntity } from '../event/event.reducer';
import { convertDateTimeToServer } from 'app/shared/util/date-utils';
import moment from 'moment';
import { APP_LOCAL_DATETIME_FORMAT } from 'app/config/constants';
import { convertTimeFormatToDaysDuration } from 'app/shared/util/duration-utils';
import '../../styles/event-module.scss';

export interface IEventActivityCreateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string; eventId: string }> {}

export class EventActivityCreate extends React.Component<IEventActivityCreateProps> {
  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    this.props.reset();
    this.props.getEventEntity(this.props.match.params.eventId);
  }

  saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);

    values['durationInDay'] = convertTimeFormatToDaysDuration({
      days: values.durationDay,
      hours: values.durationHour,
      minutes: values.durationMinute
    });

    if (errors.length === 0) {
      const { eventActivityEntity } = this.props;
      const entity = {
        ...eventActivityEntity,
        ...values
      };

      this.props.createEntity(entity);
    }
  };

  handleClose = () => {
    this.props.history.push(`/entity/event-activity/event/${this.props.match.params.eventId}`);
  };

  render() {
    const { eventId } = this.props.match.params;
    const { eventActivityEntity, loading, updating, errorMessage, eventEntity } = this.props;

    const { description } = eventActivityEntity;

    return (
      <div className="mx-3">
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.eventActivity.home.createTitle" className="event-module-form-heading">
              <Translate contentKey="clubmanagementApp.eventActivity.home.createTitle">Create Event Activity</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={{}} onSubmit={this.saveEntity}>
                <AvField hidden id="event-activity-eventId" type="string" className="form-control" name="eventId" value={eventId} />

                <AvGroup>
                  <Label id="nameLabel" for="event-activity-name">
                    <Translate contentKey="clubmanagementApp.eventActivity.name">Name</Translate>
                  </Label>
                  <AvField id="event-activity-name" type="text" name="name" required />
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
                    value={null}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="durationInDayLabel" for="event-activity-durationInDay" className="font-weight-bold">
                    <Translate contentKey="clubmanagementApp.eventActivity.duration">Duration</Translate>
                  </Label>
                  <AvField id="event-activity-duration-day" type="number" min="0" name="durationDay" label="Days" grid={{ xs: 9 }} />
                  <AvField id="event-activity-duration-hour" type="number" min="0" name="durationHour" label="Hours" grid={{ xs: 9 }} />
                  <AvField
                    id="event-activity-duration-minute"
                    type="number"
                    min="0"
                    name="durationMinute"
                    label="Minutes"
                    grid={{ xs: 9 }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="event-activity-description">
                    <Translate contentKey="clubmanagementApp.eventActivity.description">Description</Translate>
                  </Label>
                  <AvInput id="event-activity-description" type="textarea" name="description" />
                </AvGroup>
                <span className="text-error">{errorMessage ? errorMessage.response.data.detail : ''}</span>
                <div className="text-center general-buttonContainer--flexContainer">
                  <Button
                    className="general-button--width"
                    tag={Link}
                    id="cancel-save"
                    to={`/entity/event-activity/event/${eventId}`}
                    replace
                    color="cancel"
                  >
                    <Translate contentKey="entity.action.cancel">Cancel</Translate>
                  </Button>
                  &nbsp;
                  <Button className="general-button--width" color="action" id="save-entity" type="submit" disabled={updating}>
                    <Translate contentKey="entity.action.create">Create</Translate>
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
  createEntity,
  getEventEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventActivityCreate);
