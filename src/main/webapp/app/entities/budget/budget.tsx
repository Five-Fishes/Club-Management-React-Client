import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { getSortState, IPaginationBaseState, Translate } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getEventBudgetByEventId, setSelectedEventBudgetId, setShowActionOptions } from './budget.reducer';
import { eventTabList } from 'app/shared/util/tab.constants';
import { CustomTab } from 'app/shared/components/customTab/custom-tab';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { ListingCard } from 'app/shared/components/listing-card/listing-card';

export interface IBudgetProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string; eventId: string }> {}

export type IEventBudgetState = IPaginationBaseState;

export class Budget extends React.Component<IBudgetProps, IEventBudgetState> {
  state: IEventBudgetState = {
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
    this.props.getEventBudgetByEventId(eventId, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  showCardAction = (eventBudgetId: number) => {
    this.props.setSelectedEventBudgetId(eventBudgetId);
    this.props.setShowActionOptions(true);
  };

  render() {
    const { budgetList, match, totalItems } = this.props;
    const { eventId } = this.props.match.params;

    return (
      <div>
        <h2 id="event-budget-heading">
          <Translate contentKey="clubmanagementApp.eventBudget.home.title">Event Budgets</Translate>
        </h2>
        {/* Stats of Budget */}
        <CustomTab tabList={eventTabList(eventId)} currentTab="Checklist" />
        <div className="table-responsive">
          {budgetList && budgetList.length > 0 ? (
            budgetList.map((eventBudget, i) => (
              <ListingCard
                key={`event-budget-${eventBudget.id}`}
                showActionMenu
                title={eventBudget.name}
                actionMenuHandler={this.showCardAction.bind(this, eventBudget.id)}
              >
                <span className="card-item d-block mb-2">
                  <span>
                    <Translate contentKey="clubmanagementApp.eventBudget.name">Name</Translate>:
                    <span className="font-weight-bolder text-dark">{eventBudget.name}</span>
                  </span>
                </span>
                <span className="card-item d-block mb-2">
                  <span>
                    <Translate contentKey="clubmanagementApp.eventBudget.type">Type</Translate>:
                    <span className="font-weight-bolder text-dark">{eventBudget.type}</span>
                  </span>
                </span>
                <span className="card-item d-block mb-2">
                  <span>
                    <Translate contentKey="clubmanagementApp.eventBudget.details">Details</Translate>:
                    <span className="font-weight-bolder text-dark">{eventBudget.details}</span>
                  </span>
                </span>
              </ListingCard>
            ))
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="clubmanagementApp.eventBudget.home.notFound">No Event Budgets found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ budget }: IRootState) => ({
  budgetList: budget.entities,
  totalItems: budget.totalItems
});

const mapDispatchToProps = {
  getEventBudgetByEventId,
  setSelectedEventBudgetId,
  setShowActionOptions
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Budget);
