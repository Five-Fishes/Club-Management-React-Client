import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEventActivitiesByEventId, setSelectedEventActivityId, setShowActionOptions } from './event-activity.reducer';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import CustomTab from 'app/shared/components/customTab/custom-tab';
import { eventTabList } from 'app/shared/util/tab.constants';
import { ListingCard } from 'app/shared/components/listing-card/listing-card';
import { convertDateTimeFromServerToLocaleDate } from 'app/shared/util/date-utils';
import { convertDaysDurationToTimeFormat, timeFormatDurationToString } from 'app/shared/util/duration-utils';
import '../../styles/event-module.scss';
import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';

export interface IEventActivityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string; eventId: string }> {}

export type IEventActivityState = IPaginationBaseState;

export class EventActivity extends React.Component<IEventActivityProps, IEventActivityState> {
  state: IEventActivityState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
  };

  componentDidMount() {
    if (this.state.sort === 'id') {
      this.state.order = 'asc';
      this.state.sort = 'startDate';
    }
    this.getEntities();
  }

  sort = (prop: any) => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop,
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = (activePage: number) => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { eventId } = this.props.match.params;
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEventActivitiesByEventId(Number.parseInt(eventId, 10), activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  showCardAction = (eventActivityId?: number): void => {
    if (typeof eventActivityId === 'undefined') return;
    this.props.setSelectedEventActivityId(eventActivityId);
    this.props.setShowActionOptions(true);
  };

  toggleShowOptions = () => {
    this.props.setShowActionOptions(!this.props.showActionOptions);
  };

  render() {
    const { eventActivityList, match, totalItems, selectedEventActivityId } = this.props;
    const eventId: number = parseInt(this.props.match.params.eventId, 10);
    return (
      <div>
        <h2 id="event-activity-heading" className="event-module-heading">
          <Translate contentKey="clubmanagementApp.eventActivity.home.title">Event Activities</Translate>
        </h2>
        <div className="my-3">
          <CustomTab tabList={eventTabList(eventId)} currentTab="Activities" />
        </div>
        <div className="mx-4">
          <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.CREW} eventId={eventId}>
            <div className="text-center">
              <Link to={`${match.url}/new`} className="btn btn-action jh-create-entity mobile-fullWidth my-2" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="entity.action.add">Add</Translate>
              </Link>
            </div>
          </AuthorizationChecker>
          <div>
            {eventActivityList && eventActivityList.length > 0 ? (
              eventActivityList.map((eventActivity, i) => (
                <ListingCard
                  key={`event-activity-${eventActivity.id}`}
                  showActionMenu
                  title={eventActivity.name}
                  actionMenuHandler={this.showCardAction.bind(this, eventActivity.id)}
                  actionMenuAuthorizationProps={{
                    ccRole: CCRole.ADMIN,
                    eventRole: EventRole.CREW,
                    eventId: eventActivity.eventId,
                  }}
                >
                  <span className="card-item d-block mb-2">
                    <span>
                      <Translate contentKey="clubmanagementApp.eventActivity.startDate">Start Date</Translate>:{' '}
                      <span className="font-weight-bolder text-dark">{convertDateTimeFromServerToLocaleDate(eventActivity.startDate)}</span>
                    </span>
                  </span>
                  <span className="card-item d-block mb-2">
                    <span>
                      <Translate contentKey="clubmanagementApp.eventActivity.duration">Duration</Translate>:{' '}
                      <span className="font-weight-bolder text-dark">
                        {timeFormatDurationToString(convertDaysDurationToTimeFormat(eventActivity.durationInDay))}
                      </span>
                    </span>
                  </span>
                  <span className="card-item d-block">
                    <span>
                      <Translate contentKey="clubmanagementApp.eventActivity.description">Description</Translate>:{' '}
                      <span className="font-weight-bolder text-dark">{eventActivity.description}</span>
                    </span>
                  </span>
                </ListingCard>
              ))
            ) : (
              <div className="alert alert-warning">
                <Translate contentKey="clubmanagementApp.eventActivity.home.notFound">No Event Activities found</Translate>
              </div>
            )}
          </div>
        </div>

        <Modal isOpen={this.props.showActionOptions} toggle={this.toggleShowOptions} centered>
          <ModalHeader toggle={this.toggleShowOptions} />
          <ModalBody className="px-4">
            <h2 className="text-center">Options</h2>
            <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.CREW} eventId={eventId}>
              <Button
                tag={Link}
                to={`${match.url}/${selectedEventActivityId}/edit`}
                onClick={this.toggleShowOptions}
                color="secondary"
                className="d-block mx-auto my-3 w-100"
              >
                <span>
                  <Translate contentKey="entity.action.update">Update</Translate>
                </span>
              </Button>
            </AuthorizationChecker>
            <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.CREW} eventId={eventId}>
              <Button
                tag={Link}
                to={`${match.url}/${selectedEventActivityId}/delete`}
                onClick={this.toggleShowOptions}
                color="cancel"
                className="d-block mx-auto my-3 w-100"
              >
                <span>
                  <Translate contentKey="entity.action.delete">Delete</Translate>
                </span>
              </Button>
            </AuthorizationChecker>
          </ModalBody>
        </Modal>

        {/* <div className={eventActivityList && eventActivityList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.props.totalItems}
            />
          </Row>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = ({ eventActivity }: IRootState) => ({
  eventActivityList: eventActivity.entities,
  totalItems: eventActivity.totalItems,
  selectedEventActivityId: eventActivity.selectedEventActivityId,
  showActionOptions: eventActivity.showActionOptions,
});

const mapDispatchToProps = {
  getEventActivitiesByEventId,
  setSelectedEventActivityId,
  setShowActionOptions,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventActivity);
