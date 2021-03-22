import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './event-crew.reducer';
import { IEventCrew, EventCrewRole } from 'app/shared/model/event-crew.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { IUser } from 'app/shared/model/user.model';
import axios from 'axios';
import { IEvent } from 'app/shared/model/event.model';

export interface IEventCrewUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string; eventId: string }> {}

export interface IEventCrewUpdateState {
  isNew: boolean;
  users: IUser[];
  event: IEvent;
}

export class EventCrewUpdate extends React.Component<IEventCrewUpdateProps, IEventCrewUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      users: [],
      event: null
    };
  }

  getUsersAndEvent = async () => {
    const users = await axios.get<IUser[]>(`/api/users/`);
    const event = await axios.get<IEvent>(`api/events/${this.props.match.params.eventId}`);
    this.setState({ users: users.data, event: event.data });
  };

  compareFirstName = (a, b) => {
    if (a.firstName < b.firstName) {
      return -1;
    }
    if (a.firstName > b.firstName) {
      return 1;
    }
    return 0;
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
      this.getUsersAndEvent();
    } else {
      this.props.getEntity(this.props.match.params.id, this.props.match.params.eventId);
    }
  }

  componentWillUnmount() {
    this.setState({ users: [], event: null });
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { eventCrewEntity } = this.props;
      const entity = {
        ...eventCrewEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity, this.props.match.params.eventId);
      } else {
        this.props.updateEntity(entity, this.props.match.params.eventId);
      }
    }
  };

  handleClose = () => {
    this.props.history.push(`/entity/event-crew/event/${this.props.match.params.eventId}`);
  };

  render() {
    const { eventCrewEntity, loading, updating } = this.props;
    const { isNew } = this.state;
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.eventCrew.home.createOrEditLabel">{isNew ? 'Create Event Crew' : 'Edit Event Crew'}</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : eventCrewEntity} onSubmit={this.saveEntity}>
                <AvGroup hidden>
                  <Label id="eventIdLabel" for="event-crew-eventId">
                    <Translate contentKey="clubmanagementApp.eventCrew.eventName">Event Name</Translate>
                  </Label>
                  <AvField
                    id="event-crew-eventId"
                    type="string"
                    className="form-control"
                    name="eventId"
                    value={this.state.event ? this.state.event.id : null}
                    readOnly
                    required
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="userIdLabel" for="event-crew-userId">
                    <Translate contentKey="clubmanagementApp.eventCrew.userName">User Id</Translate>
                  </Label>
                  {isNew ? (
                    <div>
                      <AvInput id="event-crew-userId" type="select" className="form-control" name="userId" readOnly={!isNew} required>
                        <option value="" disabled hidden>
                          Select a user
                        </option>
                        {this.state.users
                          ? this.state.users.sort(this.compareFirstName).map(user => (
                              <option key={user.id} value={user.id}>
                                {user.firstName || '' + ' ' + (user.lastName || '')}
                              </option>
                            ))
                          : null}
                      </AvInput>
                      <AvFeedback>Please select a user to assign as crew.</AvFeedback>
                    </div>
                  ) : (
                    <div>
                      <AvInput id="event-crew-userId" type="text" className="form-control" name="userId" hidden required />
                      <AvInput type="text" name="userName" className="form-control" readOnly />
                    </div>
                  )}
                </AvGroup>
                <AvGroup>
                  <Label id="roleLabel" for="event-crew-role">
                    <Translate contentKey="clubmanagementApp.eventCrew.role">Role</Translate>
                  </Label>
                  <AvInput
                    id="event-crew-role"
                    type="select"
                    className="form-control"
                    name="role"
                    value={(!isNew && eventCrewEntity.role) || 'HEAD'}
                    required
                  >
                    <option value={EventCrewRole.HEAD}>{EventCrewRole.HEAD}</option>
                    <option value={EventCrewRole.MEMBER}>{EventCrewRole.MEMBER}</option>
                  </AvInput>
                </AvGroup>
                <br />
                <div className="d-flex justify-content-around">
                  <Button
                    tag={Link}
                    id="cancel-save"
                    to={`/entity/event-crew/event/${this.props.match.params.eventId}`}
                    replace
                    color="cancel"
                    className="px-5"
                  >
                    Cancel
                  </Button>
                  <Button color="action" id="save-entity" type="submit" disabled={updating} className="px-5">
                    <Translate contentKey="entity.action.save">Save</Translate>
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
  eventCrewEntity: storeState.eventCrew.entity,
  loading: storeState.eventCrew.loading,
  updating: storeState.eventCrew.updating,
  updateSuccess: storeState.eventCrew.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventCrewUpdate);
