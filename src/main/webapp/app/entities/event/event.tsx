import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Container, Row, Col, Card, CardImg, Button } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  byteSize,
  Translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './event.reducer';
import { IEvent } from 'app/shared/model/event.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import FloatButton from 'app/shared/components/floatButton/FloatButton';
import EventModal from 'app/shared/components/eventModal/event-modal';
import CustomTab from 'app/shared/components/customTab/custom-tab';
import { eventMainTabList } from 'app/shared/util/tab.constants';
import './events.scss';
import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';

export interface IEventProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IEventState = IPaginationBaseState & {
  modalIsOpen: boolean;
  eventId: number;
};

export class Event extends React.Component<IEventProps, IEventState> {
  state: IEventState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    modalIsOpen: false,
    eventId: null
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  openModal = eventId => {
    this.setState({ modalIsOpen: true, eventId });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, eventId: null });
  };

  render() {
    const { eventList, match, totalItems } = this.props;
    return (
      <Container>
        <EventModal
          isOpen={this.state.modalIsOpen}
          updatePath={`${match.url}/${this.state.eventId}/edit`}
          deletePath={`${match.url}/${this.state.eventId}/delete`}
          toggleModal={this.closeModal}
          eventId={this.state.eventId}
          updateCCRole={CCRole.ADMIN}
          updateEventRole={EventRole.HEAD}
          deleteCCRole={CCRole.ADMIN}
          deleteEventRole={EventRole.HEAD}
        />
        <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.HEAD} eventId={this.state.eventId}>
          <Link to="/entity/event/new">
            <FloatButton />
          </Link>
        </AuthorizationChecker>
        <h1>Events</h1>
        <div className="my-3">
          <CustomTab currentTab="Upcoming" tabList={eventMainTabList} />
        </div>
        <div className="d-flex justify-content-center">{/* <CustomTab tabList={sampleTabList} currentTab="Upcoming" /> */}</div>
        <div>
          {eventList.map(event => (
            <div className="my-3" key={event.id}>
              <EventCard event={event} toggleModal={this.openModal} />
            </div>
          ))}
        </div>
      </Container>
    );
  }
}

const EventCard = ({ event, toggleModal }) => {
  const onToggleModal = () => toggleModal(event.id);
  return (
    <Card className="p-3 pt-4 event-card">
      <Row>
        <Col xs="4" lg="5" className="pr-0">
          <CardImg height="100%" width="100%" className="rounded-0" src={event.imageUrl} alt={event.fileName} />
        </Col>
        <Col xs="8" lg="7">
          <Button color="link" className="option-icon p-0" onClick={onToggleModal}>
            <FontAwesomeIcon icon={'ellipsis-h'} />
          </Button>
          <div className="my-auto">
            <Link to={`/entity/event/${event.id}`}>
              <h4 className="event-title">{event.name}</h4>
            </Link>
            <p className="mb-0">
              Start Date: <TextFormat type="date" value={event.startDate} format={APP_DATE_FORMAT} />
            </p>
            <p className="mb-0">
              End Date: <TextFormat type="date" value={event.endDate} format={APP_DATE_FORMAT} />
            </p>
            <p className="mb-0">Venue: {event.venue}</p>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

const mapStateToProps = ({ event }: IRootState) => ({
  eventList: event.entities,
  totalItems: event.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);
