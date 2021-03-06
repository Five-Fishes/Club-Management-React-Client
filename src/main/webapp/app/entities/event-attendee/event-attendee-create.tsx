import 'app/styles/event-module.scss';
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './event-attendee.reducer';
import { IEventAttendee } from 'app/shared/model/event-attendee.model';
// tslint:disable-next-line:no-unused-variable
import { IEvent } from 'app/shared/model/event.model';

export interface IEventAttendeeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string; eventId: string }> {}

export interface IEventAttendeeUpdateState {
  event: IEvent | null;
}

export class EventAttendeeUpdate extends React.Component<IEventAttendeeUpdateProps, IEventAttendeeUpdateState> {
  constructor(props: IEventAttendeeUpdateProps) {
    super(props);
    this.state = {
      event: null,
    };
  }

  getEvent = async () => {
    const event = await axios.get<IEvent>(`api/events/${this.props.match.params.eventId}`);
    this.setState({ event: event.data });
  };

  componentDidMount() {
    this.getEvent();
  }

  componentWillUpdate(nextProps: IEventAttendeeUpdateProps, nextState: IEventAttendeeUpdateState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { eventAttendeeEntity } = this.props;
      const entity = {
        ...eventAttendeeEntity,
        ...values,
      };

      this.props.createEntity(entity);
    }
  };

  handleClose = () => {
    this.props.history.push(`/entity/event/${this.props.match.params.eventId}`);
  };

  render() {
    const { userId, loading, updating, match } = this.props;

    return (
      <div className="mx-3">
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.eventAttendee.home.createOrEditLabel" className="event-module-form-heading">
              <Translate contentKey="clubmanagementApp.eventAttendee.home.registerLabel">Register as EventAttendee</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm onSubmit={this.saveEntity}>
                <AvGroup hidden>
                  <Label id="userIdLabel" for="event-attendee-userId">
                    <Translate contentKey="clubmanagementApp.eventAttendee.userId">User</Translate>
                  </Label>
                  <AvField id="event-attendee-userId" type="string" className="form-control" name="userId" value={userId} disabled />
                </AvGroup>
                <AvGroup>
                  <Label id="eventIdLabel" for="event-attendee-eventId">
                    <Translate contentKey="clubmanagementApp.event.detail.title">Event</Translate>
                  </Label>
                  <AvField
                    type="string"
                    className="form-control"
                    name="event"
                    value={this.state.event ? this.state.event.name : null}
                    disabled
                  />
                  <AvField
                    id="event-attendee-eventId"
                    type="string"
                    className="form-control"
                    name="eventId"
                    value={match.params.eventId}
                    disabled
                    hidden
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="provideTransportLabel" check>
                    <AvInput
                      id="event-attendee-provideTransport"
                      type="checkbox"
                      className="form-control transport-checkbox"
                      name="provideTransport"
                    />
                    <Translate contentKey="clubmanagementApp.eventAttendee.provideTransport">Provide Transport</Translate>
                  </Label>
                </AvGroup>
                <div className="general-buttonContainer--flexContainer">
                  <Button
                    className="general-button--width"
                    tag={Link}
                    id="cancel-save"
                    to={`/entity/event/${match.params.eventId}`}
                    replace
                    color="cancel"
                  >
                    <Translate contentKey="entity.action.cancel">Cancel</Translate>
                  </Button>
                  &nbsp;
                  <Button className="general-button--width" color="action" id="save-entity" type="submit" disabled={updating}>
                    <Translate contentKey="entity.action.register">Register</Translate>
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
  userId: storeState.authentication.id,
  eventAttendeeEntity: storeState.eventAttendee.entity,
  loading: storeState.eventAttendee.loading,
  updating: storeState.eventAttendee.updating,
  updateSuccess: storeState.eventAttendee.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventAttendeeUpdate);
