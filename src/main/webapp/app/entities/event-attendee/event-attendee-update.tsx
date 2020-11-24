import React from 'react';
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
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEventAttendeeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEventAttendeeUpdateState {
  isNew: boolean;
}

export class EventAttendeeUpdate extends React.Component<IEventAttendeeUpdateProps, IEventAttendeeUpdateState> {
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

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { eventAttendeeEntity } = this.props;
      const entity = {
        ...eventAttendeeEntity,
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
    this.props.history.push('/entity/event-attendee');
  };

  render() {
    const { eventAttendeeEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.eventAttendee.home.createOrEditLabel">
              <Translate contentKey="clubmanagementApp.eventAttendee.home.createOrEditLabel">Create or edit a EventAttendee</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : eventAttendeeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="event-attendee-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="event-attendee-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="userIdLabel" for="event-attendee-userId">
                    <Translate contentKey="clubmanagementApp.eventAttendee.userId">User Id</Translate>
                  </Label>
                  <AvField id="event-attendee-userId" type="string" className="form-control" name="userId" />
                </AvGroup>
                <AvGroup>
                  <Label id="eventIdLabel" for="event-attendee-eventId">
                    <Translate contentKey="clubmanagementApp.eventAttendee.eventId">Event Id</Translate>
                  </Label>
                  <AvField id="event-attendee-eventId" type="string" className="form-control" name="eventId" />
                </AvGroup>
                <AvGroup>
                  <Label id="provideTransportLabel" check>
                    <AvInput id="event-attendee-provideTransport" type="checkbox" className="form-control" name="provideTransport" />
                    <Translate contentKey="clubmanagementApp.eventAttendee.provideTransport">Provide Transport</Translate>
                  </Label>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/event-attendee" replace color="info">
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
  eventAttendeeEntity: storeState.eventAttendee.entity,
  loading: storeState.eventAttendee.loading,
  updating: storeState.eventAttendee.updating,
  updateSuccess: storeState.eventAttendee.updateSuccess
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
)(EventAttendeeUpdate);
