import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Container, Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './event-crew.reducer';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { IUser } from 'app/shared/model/user.model';
import axios from 'axios';
import { IEvent } from 'app/shared/model/event.model';

export interface IEventCrewUpdateProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{ id: string; eventId: string; role?: string }> {}

export interface IEventCrewUpdateState {
  isNew: boolean;
  users: IUser[];
  event: IEvent | null;
  role?: string;
}

export class EventCrewUpdate extends React.Component<IEventCrewUpdateProps, IEventCrewUpdateState> {
  constructor(props: IEventCrewUpdateProps) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      users: [],
      event: null,
      role: this.props.match.params.role || undefined,
    };
  }

  getUsersAndEvent = async () => {
    const eventId = this.props.match.params.eventId;
    const users = await axios.get<IUser[]>(`/api/users/event-crews/${eventId}`);
    const event = await axios.get<IEvent>(`api/events/${eventId}`);
    this.setState({ users: users.data, event: event.data });
  };

  compareFirstName = (a: IUser, b: IUser) => `${a.firstName}`.localeCompare(`${b.firstName}`);

  componentWillUpdate(nextProps: IEventCrewUpdateProps, nextState: IEventCrewUpdateState) {
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

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { eventCrewEntity } = this.props;
      const entity = {
        ...eventCrewEntity,
        ...values,
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
    const isCreateHead = this.state.role !== undefined && this.state.role === 'head';
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            {isNew ? (
              <h2 id="clubmanagementApp.eventCrew.home.createLabel" className="event-module-form-heading">
                {isCreateHead ? (
                  <Translate contentKey="clubmanagementApp.eventCrew.home.createHeadLabel">Create Event Head</Translate>
                ) : (
                  <Translate contentKey="clubmanagementApp.eventCrew.home.createLabel">Create Event Crew</Translate>
                )}
              </h2>
            ) : (
              <h2 id="clubmanagementApp.event.home.editLabel" className="event-module-form-heading">
                <Translate contentKey="clubmanagementApp.event.home.editLabel">Edit Event Crew</Translate>
              </h2>
            )}
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
                    <Translate contentKey="clubmanagementApp.eventCrew.crew">User Id</Translate>
                  </Label>
                  {isNew ? (
                    <div>
                      <AvInput id="event-crew-userId" type="select" className="form-control" name="userId" readOnly={!isNew} required>
                        <option value="" disabled hidden>
                          {translate('global.select.selectUser')}
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
                    value={isCreateHead ? 'HEAD' : (!isNew && eventCrewEntity.role) || ''}
                    required
                    disabled={isCreateHead}
                  >
                    <option value="" disabled hidden>
                      {translate('global.select.selectOne')}
                    </option>
                    <option value="HEAD">{translate(`clubmanagementApp.EventCrewRole.HEAD`)}</option>
                    <option value="MEMBER">{translate(`clubmanagementApp.EventCrewRole.MEMBER`)}</option>
                  </AvInput>
                </AvGroup>
                <br />
                <div className="general-buttonContainer--flexContainer">
                  <Button
                    className="general-button--width"
                    tag={Link}
                    id="cancel-save"
                    to={`/entity/event-crew/event/${this.props.match.params.eventId}`}
                    replace
                    color="cancel"
                  >
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
      </Container>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  eventCrewEntity: storeState.eventCrew.entity,
  loading: storeState.eventCrew.loading,
  updating: storeState.eventCrew.updating,
  updateSuccess: storeState.eventCrew.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventCrewUpdate);
