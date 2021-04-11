import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Container, Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, getSortState, ICrudGetAllAction, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { IRootState } from 'app/shared/reducers';
import { getEntities, getEventCrewByEventId } from './event-crew.reducer';
import { IEventCrew, EventCrewRole } from 'app/shared/model/event-crew.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { CustomTab } from 'app/shared/components/customTab/custom-tab';
import EventModal from 'app/shared/components/eventModal/event-modal';
import { eventTabList } from 'app/shared/util/tab.constants';
import { EventTable } from 'app/shared/components/eventTable/EventTable';

export interface IEventCrewProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string; eventId: string }> {}

export class EventCrew extends React.Component<IEventCrewProps> {
  state = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    modalIsOpen: false,
    eventCrewId: null,
    eventId: this.props.match.params.eventId
  };

  openModal = eventCrewId => {
    this.setState({ modalIsOpen: true, eventCrewId });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, eventCrewId: null });
  };

  componentDidMount() {
    const { eventId } = this.props.match.params;
    this.props.getEventCrewByEventId(Number.parseInt(eventId, 10));
  }

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  getEntities = () => {
    const { eventId } = this.props.match.params;
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEventCrewByEventId(Number.parseInt(eventId, 10), activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { eventCrewList, match } = this.props;
    const { eventId } = this.props.match.params;
    return (
      <Container>
        <EventModal
          isOpen={this.state.modalIsOpen}
          updatePath={`${match.url}/${this.state.eventCrewId}/edit`}
          deletePath={`${match.url}/${this.state.eventCrewId}/delete`}
          toggleModal={this.closeModal}
        />
        <h1 id="event-crew-heading">
          <Translate contentKey="clubmanagementApp.eventCrew.home.title">Event Crews</Translate>
        </h1>
        <div className="my-4">
          <CustomTab currentTab="Crews" tabList={eventTabList(eventId)} />
        </div>

        <Link to={`${match.url}/new`} className="btn btn-action jh-create-entity w-100" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="clubmanagementApp.eventCrew.home.createLabel">Add Event Crew</Translate>
        </Link>

        <div className="table-responsive mt-4">
          {eventCrewList && eventCrewList.length > 0 ? (
            <EventTable users={eventCrewList} openModal={this.openModal} />
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="clubmanagementApp.eventCrew.home.notFound">No Event Crews found {}</Translate>
            </div>
          )}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = ({ eventCrew }: IRootState) => ({
  eventCrewList: eventCrew.entities
});

const mapDispatchToProps = {
  getEntities,
  getEventCrewByEventId
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventCrew);
