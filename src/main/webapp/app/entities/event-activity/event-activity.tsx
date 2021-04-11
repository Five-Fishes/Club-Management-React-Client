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
import '../../styles/event-module.scss';
import { CustomTab } from 'app/shared/components/customTab/custom-tab';
import { eventTabList } from 'app/shared/util/tab.constants';
import { ListingCard } from 'app/shared/components/listing-card/listing-card';
import { convertDateTimeFromServerToLocaleDate } from 'app/shared/util/date-utils';

export interface IEventActivityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string; eventId: string }> {}

export type IEventActivityState = IPaginationBaseState;

export class EventActivity extends React.Component<IEventActivityProps, IEventActivityState> {
  state: IEventActivityState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
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
    const { eventId } = this.props.match.params;
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEventActivitiesByEventId(Number.parseInt(eventId, 10), activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  showCardAction = (eventActivityId: number) => {
    this.props.setSelectedEventActivityId(eventActivityId);
    this.props.setShowActionOptions(true);
  };

  toggleShowOptions = () => {
    this.props.setShowActionOptions(!this.props.showActionOptions);
  };

  render() {
    const { eventActivityList, match, totalItems, selectedEventActivityId } = this.props;
    const { eventId } = this.props.match.params;
    return (
      <div>
        <h2 id="event-activity-heading">
          <Translate contentKey="clubmanagementApp.eventActivity.home.title">Event Activities</Translate>
        </h2>
        <CustomTab tabList={eventTabList(eventId)} currentTab="Activities" />
        <div className="text-center">
          <Link to={`${match.url}/new`} className="btn btn-action jh-create-entity mobile-fullWidth my-2" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="entity.action.add">Add</Translate>
          </Link>
        </div>

        <div>
          {eventActivityList && eventActivityList.length > 0 ? (
            eventActivityList.map((eventActivity, i) => (
              <ListingCard
                key={`event-activity-${eventActivity.id}`}
                showActionMenu
                title={eventActivity.name}
                actionMenuHandler={this.showCardAction.bind(this, eventActivity.id)}
              >
                <span className="card-item d-block mb-2">
                  <span>
                    <Translate contentKey="clubmanagementApp.eventActivity.startDate">Start Date</Translate>:{' '}
                    <span className="font-weight-bolder text-dark">{convertDateTimeFromServerToLocaleDate(eventActivity.startDate)}</span>
                  </span>
                </span>
                <span className="card-item d-block mb-2">
                  <span>
                    <Translate contentKey="clubmanagementApp.eventActivity.durationInDay">Duration (In Day)</Translate>:{' '}
                    <span className="font-weight-bolder text-dark">{eventActivity.durationInDay}</span>
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

        <Modal isOpen={this.props.showActionOptions} toggle={this.toggleShowOptions}>
          <ModalHeader toggle={this.toggleShowOptions} />
          <ModalBody>
            <h2 className="text-center">Options</h2>
            <Button
              tag={Link}
              to={`${match.url}/${selectedEventActivityId}/edit`}
              onClick={this.toggleShowOptions}
              color="primary"
              className="d-block mx-auto my-3 w-75"
            >
              <FontAwesomeIcon icon="pencil-alt" />{' '}
              <span>
                <Translate contentKey="entity.action.update">Update</Translate>
              </span>
            </Button>
            <Button
              tag={Link}
              to={`${match.url}/${selectedEventActivityId}/delete`}
              onClick={this.toggleShowOptions}
              color="cancel"
              className="d-block mx-auto my-3 w-75"
            >
              <FontAwesomeIcon icon="trash" />{' '}
              <span>
                <Translate contentKey="entity.action.delete">Delete</Translate>
              </span>
            </Button>
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
  showActionOptions: eventActivity.showActionOptions
});

const mapDispatchToProps = {
  getEventActivitiesByEventId,
  setSelectedEventActivityId,
  setShowActionOptions
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventActivity);
