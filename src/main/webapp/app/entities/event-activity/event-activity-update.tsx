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
import { convertDaysDurationToTimeFormat, convertTimeFormatToDaysDuration } from 'app/shared/util/duration-utils';
import '../../styles/event-module.scss';

export interface IEventActivityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string; eventId: string }> {}

export class EventActivityUpdate extends React.Component<IEventActivityUpdateProps> {
  constructor(props: IEventActivityUpdateProps) {
    super(props);
  }

  componentWillUpdate(nextProps: IEventActivityUpdateProps) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id, this.props.match.params.eventId);
    this.props.getEventEntity(this.props.match.params.eventId);
  }

  setDurationInTimeFormat() {
    const duration = convertDaysDurationToTimeFormat(this.props.eventActivityEntity.durationInDay);
    return {
      durationDay: duration.days,
      durationHour: duration.hours,
      durationMinute: duration.minutes,
    };
  }

  saveEntity = (event: any, errors: any, values: any) => {
    values.startDate = convertDateTimeToServer(values.startDate);

    values['durationInDay'] = convertTimeFormatToDaysDuration({
      days: values.durationDay,
      hours: values.durationHour,
      minutes: values.durationMinute,
    });

    if (errors.length === 0) {
      const { eventActivityEntity } = this.props;
      const entity = {
        ...eventActivityEntity,
        ...values,
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
    const timeFormatDuration = this.setDurationInTimeFormat();

    return (
      <div className="mx-3">
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.eventActivity.home.createOrEditLabel" className="event-module-form-heading">
              <Translate contentKey="clubmanagementApp.eventActivity.home.updateTitle">Update Event Activity</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm
                model={{
                  ...eventActivityEntity,
                  ...timeFormatDuration,
                }}
                onSubmit={this.saveEntity}
              >
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
                        start: {
                          value: moment().format(APP_LOCAL_DATETIME_FORMAT),
                          errorMessage: 'Activity Date cannot early than today',
                        },
                        end: {
                          value: eventEntity.hasOwnProperty('endDate') ? eventEntity.endDate : '2030-12-30T10:00',
                          errorMessage: 'Activity Date cannot later than Event Date',
                        },
                      },
                    }}
                    value={convertDateTimeFromServer(this.props.eventActivityEntity.startDate)}
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
                <span className="text-error">{errorMessage ? errorMessage.response?.data?.detail : ''}</span>
                <div className="text-center general-buttonContainer--flexContainer">
                  <Button
                    className="general-button--width"
                    tag={Link}
                    id="cancel-save"
                    to={`/entity/event-activity/event/${eventId}`}
                    replace
                    color="cancel"
                  >
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </Button>
                  &nbsp;
                  <Button className="general-button--width" color="action" id="save-entity" type="submit" disabled={updating}>
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
  eventEntity: storeState.event.entity,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  getEventEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventActivityUpdate);
