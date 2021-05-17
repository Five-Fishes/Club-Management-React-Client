import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Container } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { getSortState, IPaginationBaseState } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getUpcomingEntities, getPreviousEntities } from './event.reducer';
// tslint:disable-next-line:no-unused-variable
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import FloatButton from 'app/shared/components/floatButton/FloatButton';
import EventModal from 'app/shared/components/eventModal/event-modal';
import CustomTab from 'app/shared/components/customTab/custom-tab';
import { eventMainTabList } from 'app/shared/util/tab.constants';
import './events.scss';
import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';
import EventCard from './event-card';

export interface IEventProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IEventState = IPaginationBaseState & {
  modalIsOpen: boolean;
  eventId?: number;
};

export class Event extends React.Component<IEventProps, IEventState> {
  constructor(props: IEventProps) {
    super(props);

    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      modalIsOpen: false,
      eventId: undefined,
    };

    this.getTab = this.getTab.bind(this);
    this.getUpcomingEntities = this.getUpcomingEntities.bind(this);
    this.getPreviousEntities = this.getPreviousEntities.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount(): void {
    const tab = this.getTab();
    if (tab === 'previous') {
      this.getPreviousEntities();
    } else {
      this.getUpcomingEntities();
    }
  }

  componentDidUpdate(prevProps: IEventProps): void {
    const path = this.props.location.search;
    if (prevProps.location.search !== path) {
      const tab = path.substring(path.lastIndexOf('?') + 1);
      if (tab === 'previous') {
        this.getPreviousEntities();
      } else {
        this.getUpcomingEntities();
      }
    }
  }

  getTab(): string {
    const path = this.props.location.search;
    return path.substring(path.lastIndexOf('?') + 1);
  }

  getUpcomingEntities(): void {
    const { activePage, itemsPerPage } = this.state;
    this.props.getUpcomingEntities(activePage - 1, itemsPerPage, `startDate,desc`);
  }

  getPreviousEntities(): void {
    const { activePage, itemsPerPage } = this.state;
    this.props.getPreviousEntities(activePage - 1, itemsPerPage, `startDate,desc`);
  }

  openModal(eventId?: number): void {
    this.setState({ modalIsOpen: true, eventId });
  }

  closeModal(): void {
    this.setState({ modalIsOpen: false, eventId: undefined });
  }

  render() {
    const { eventList, match } = this.props;
    const { eventId } = this.state;
    const tab = this.getTab();
    return (
      <Container>
        <EventModal
          isOpen={this.state.modalIsOpen}
          updatePath={`${match.url}/${eventId}/edit`}
          deletePath={`${match.url}/${eventId}/delete`}
          toggleModal={this.closeModal}
          updateBtnAuthorizationProps={{
            eventId,
            ccRole: CCRole.ADMIN,
            eventRole: EventRole.HEAD,
          }}
          deleteBtnAuthorizationProps={{
            eventId,
            ccRole: CCRole.ADMIN,
            eventRole: EventRole.HEAD,
          }}
        />
        <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.HEAD} eventId={eventId}>
          <Link to="/entity/event/new">
            <FloatButton />
          </Link>
        </AuthorizationChecker>
        <h1>Events</h1>
        <div className="my-3">
          <CustomTab currentTab={tab === 'previous' ? 'Previous' : 'Upcoming'} tabList={eventMainTabList} />
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

const mapStateToProps = ({ event }: IRootState) => ({
  eventList: event.entities,
  totalItems: event.totalItems,
});

const mapDispatchToProps = {
  getUpcomingEntities,
  getPreviousEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Event);
