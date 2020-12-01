import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './event-crew.reducer';
import { IEventCrew } from 'app/shared/model/event-crew.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventCrewProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class EventCrew extends React.Component<IEventCrewProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { eventCrewList, match } = this.props;
    return (
      <div>
        <h2 id="event-crew-heading">
          <Translate contentKey="clubmanagementApp.eventCrew.home.title">Event Crews</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="clubmanagementApp.eventCrew.home.createLabel">Create new Event Crew</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {eventCrewList && eventCrewList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.eventCrew.userId">User Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.eventCrew.eventId">Event Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.eventCrew.role">Role</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {eventCrewList.map((eventCrew, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${eventCrew.id}`} color="link" size="sm">
                        {eventCrew.id}
                      </Button>
                    </td>
                    <td>{eventCrew.userId}</td>
                    <td>{eventCrew.eventId}</td>
                    <td>
                      <Translate contentKey={`clubmanagementApp.EventCrewRole.${eventCrew.role}`} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${eventCrew.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${eventCrew.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${eventCrew.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="clubmanagementApp.eventCrew.home.notFound">No Event Crews found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ eventCrew }: IRootState) => ({
  eventCrewList: eventCrew.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventCrew);
