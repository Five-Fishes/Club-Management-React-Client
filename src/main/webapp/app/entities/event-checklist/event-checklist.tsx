import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { byteSize, Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getChecklistsByEventId, setSelectedEventChecklistId, setShowActionOptions } from './event-checklist.reducer';
import { IEventChecklist } from 'app/shared/model/event-checklist.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import '../../styles/event-module.scss';
import { CustomTab } from 'app/shared/components/customTab/custom-tab';
import { eventTabList } from 'app/shared/util/tab.constants';
import { ListingCard } from 'app/shared/components/listing-card/listing-card';
import './eventChecklist.scss';
import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';

export interface IEventChecklistProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string; eventId: string }> {}

export type IEventChecklistState = IPaginationBaseState;

export class EventChecklist extends React.Component<IEventChecklistProps, IEventChecklistState> {
  state: IEventChecklistState = {
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
    const eventId = this.props.match.params.eventId;
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getChecklistsByEventId(Number.parseInt(eventId, 10), activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  showCardAction = (eventChecklistId: number) => {
    this.props.setSelectedEventChecklistId(eventChecklistId);
    this.props.setShowActionOptions(true);
  };

  toggleShowOptions = () => {
    this.props.setShowActionOptions(!this.props.showActionOptions);
  };

  render() {
    const { eventChecklistList, match, totalItems, selectedEventChecklistId } = this.props;
    const eventId: number = parseInt(this.props.match.params.eventId, 10);
    return (
      <div>
        <h2 id="event-checklist-heading" className="event-module-heading">
          <Translate contentKey="clubmanagementApp.eventChecklist.home.title">Event Checklists</Translate>
        </h2>
        <div className="my-3">
          <CustomTab tabList={eventTabList(eventId)} currentTab="Checklist" />
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
            {eventChecklistList && eventChecklistList.length > 0 ? (
              eventChecklistList.map((eventChecklist, i) => (
                // tslint:disable
                <ListingCard
                  key={`event-checklist-${eventChecklist.id}`}
                  showActionMenu
                  title={eventChecklist.name}
                  actionMenuHandler={this.showCardAction.bind(this, eventChecklist.id)}
                >
                  <span className="card-item d-block mb-2">
                    <span>
                      <Translate contentKey="clubmanagementApp.eventChecklist.type">Type</Translate>:
                      <span className="font-weight-bolder text-dark">{eventChecklist.type}</span>
                    </span>
                    <span className="float-right">
                      <Translate contentKey="clubmanagementApp.eventChecklist.status">Status</Translate>:
                      <span className="font-weight-bolder text-dark">{eventChecklist.status}</span>
                    </span>
                  </span>
                  <span className="card-item d-block">
                    <span>
                      <Translate contentKey="clubmanagementApp.eventChecklist.description">Description</Translate>:
                      <span className="font-weight-bolder text-dark">{eventChecklist.description}</span>
                    </span>
                  </span>
                </ListingCard>
              ))
            ) : (
              <div className="alert alert-warning">
                <Translate contentKey="clubmanagementApp.eventChecklist.home.notFound">No Event Checklists found</Translate>
              </div>
            )}
          </div>
          <Modal isOpen={this.props.showActionOptions} toggle={this.toggleShowOptions}>
            <ModalHeader toggle={this.toggleShowOptions} />
            <ModalBody>
              <h2 className="text-center">Options</h2>
              <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.CREW} eventId={eventId}>
                <Button
                  tag={Link}
                  to={`${match.url}/${selectedEventChecklistId}/edit`}
                  color="primary"
                  className="d-block mx-auto my-3 w-75"
                  onClick={this.toggleShowOptions}
                >
                  <FontAwesomeIcon icon="pencil-alt" />{' '}
                  <span>
                    <Translate contentKey="entity.action.update">Update</Translate>
                  </span>
                </Button>
              </AuthorizationChecker>
              <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.CREW} eventId={eventId}>
                <Button
                  tag={Link}
                  to={`${match.url}/${selectedEventChecklistId}/delete`}
                  color="cancel"
                  className="d-block mx-auto my-3 w-75"
                  onClick={this.toggleShowOptions}
                >
                  <FontAwesomeIcon icon="trash" />{' '}
                  <span>
                    <Translate contentKey="entity.action.delete">Delete</Translate>
                  </span>
                </Button>
              </AuthorizationChecker>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ eventChecklist }: IRootState) => ({
  eventChecklistList: eventChecklist.entities,
  totalItems: eventChecklist.totalItems,
  selectedEventChecklistId: eventChecklist.selectedEventChecklistId,
  showActionOptions: eventChecklist.showActionOptions
});

const mapDispatchToProps = {
  getChecklistsByEventId,
  setSelectedEventChecklistId,
  setShowActionOptions
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventChecklist);
