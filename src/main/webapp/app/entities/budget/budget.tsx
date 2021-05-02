import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { getSortState, IPaginationBaseState, Translate, translate } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import {
  getEventBudgetByEventId,
  setSelectedEventBudgetId,
  setShowActionOptions,
  getEventBudgetTotal,
  getEventRealTotal
} from './budget.reducer';
import { eventTabList } from 'app/shared/util/tab.constants';
import classnames from 'classnames';
import '../../styles/event-module.scss';
import CustomTab from 'app/shared/components/customTab/custom-tab';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { ListingCard } from 'app/shared/components/listing-card/listing-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';

export interface IBudgetProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string; eventId: string }> {}

export type IEventBudgetState = IPaginationBaseState;

export class Budget extends React.Component<IBudgetProps, IEventBudgetState> {
  state: IEventBudgetState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
    this.getEventBudgetTotal();
    this.getEventRealTotal();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.totalItems !== this.props.totalItems) {
      this.getEventBudgetTotal();
    }
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

  getEventBudgetTotal = () => {
    const eventId = this.props.match.params.eventId;
    this.props.getEventBudgetTotal(eventId);
  };

  getEventRealTotal = () => {
    const eventId = this.props.match.params.eventId;
    this.props.getEventRealTotal(eventId);
  };

  showCardAction = (eventBudgetId: number) => {
    this.props.setSelectedEventBudgetId(eventBudgetId);
    this.props.setShowActionOptions(true);
  };

  toggleShowOptions = () => {
    this.props.setShowActionOptions(!this.props.showActionOptions);
  };

  render() {
    const { budgetList, match, totalItems, selectedEventBudgetId, eventBudgetTotal, eventRealTotal } = this.props;
    const eventId: number = parseInt(this.props.match.params.eventId, 10);
    return (
      <div>
        <h2 id="event-budget-heading" className="event-module-heading">
          <Translate contentKey="clubmanagementApp.eventBudget.home.title">Event Budgets</Translate>
        </h2>
        <div className="my-3">
          <CustomTab tabList={eventTabList(eventId)} currentTab="Budget" />
        </div>
        {/* Stats of Budget */}
        <div className="mx-4">
          <div>
            {eventBudgetTotal.hasOwnProperty('totalExpense') && (
              <div className="my-4">
                <h3 className="text-income">
                  <Translate contentKey="clubmanagementApp.eventBudget.budget">Budget</Translate>:
                </h3>
                <span>
                  <span className="text-income">
                    <Translate contentKey="clubmanagementApp.eventBudget.income">Income</Translate>: &nbsp;
                    <span className="small">RM {eventBudgetTotal.totalIncome.toFixed(2)}</span>
                  </span>
                  <span className="float-right text-expense">
                    <Translate contentKey="clubmanagementApp.eventBudget.expense">Expense</Translate>: &nbsp;
                    <span className="small">RM {eventBudgetTotal.totalExpense.toFixed(2)}</span>
                  </span>
                </span>
              </div>
            )}
            {eventRealTotal.hasOwnProperty('totalExpense') && (
              <div className="my-4">
                <h3 className="text-income">
                  <Translate contentKey="clubmanagementApp.eventBudget.realAmount">Real Amount</Translate>:
                </h3>
                <span>
                  <span className="text-income">
                    <Translate contentKey="clubmanagementApp.eventBudget.income">Income</Translate>: &nbsp;
                    <span className="small">RM {eventRealTotal.totalIncome.toFixed(2)}</span>
                  </span>
                  <span className="float-right text-expense">
                    <Translate contentKey="clubmanagementApp.eventBudget.expense">Expense</Translate>: &nbsp;
                    <span className="small">RM {eventRealTotal.totalExpense.toFixed(2)}</span>
                  </span>
                </span>
              </div>
            )}
          </div>
          <div className="text-center">
            <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.HEAD} eventId={eventId}>
              <Link to={`${match.url}/new`} className="btn btn-action jh-create-entity mobile-fullWidth my-2" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="entity.action.add">Add</Translate>
              </Link>
            </AuthorizationChecker>
          </div>
          <div>
            {budgetList && budgetList.length > 0 ? (
              budgetList.map((eventBudget, i) => (
                <ListingCard
                  key={`event-budget-${eventBudget.id}`}
                  showActionMenu
                  actionMenuHandler={this.showCardAction.bind(this, eventBudget.id)}
                  actionMenuAuthorizationProps={{
                    ccRole: CCRole.ADMIN,
                    eventRole: EventRole.HEAD,
                    eventId: eventBudget.eventId
                  }}
                >
                  <span
                    className={classnames(
                      'font-weight-bold text-dark d-block mb-1',
                      eventBudget.type === 'INCOME' ? 'text-income' : 'text-expense'
                    )}
                  >
                    {'RM ' + eventBudget.amount.toFixed(2).toString()}
                  </span>
                  <span className="card-item d-block mb-2">
                    <span>
                      <Translate contentKey="clubmanagementApp.eventBudget.name">Name</Translate>:{' '}
                      <span className="font-weight-bolder text-dark">{eventBudget.name}</span>
                    </span>
                  </span>
                  <span className="card-item d-block mb-2">
                    <span>
                      <Translate contentKey="clubmanagementApp.eventBudget.type">Type</Translate>:{' '}
                      <span className="font-weight-bolder text-dark">
                        {translate(`clubmanagementApp.TransactionType.${eventBudget.type}`)}
                      </span>
                    </span>
                  </span>
                  <span className="card-item d-block mb-2">
                    <span>
                      <Translate contentKey="clubmanagementApp.eventBudget.details">Details</Translate>:{' '}
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

        <Modal isOpen={this.props.showActionOptions} toggle={this.toggleShowOptions} centered>
          <ModalHeader toggle={this.toggleShowOptions} />
          <ModalBody className="px-4">
            <h2 className="text-center">Options</h2>
            <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.HEAD} eventId={eventId}>
              <Button
                tag={Link}
                to={`${match.url}/${selectedEventBudgetId}/edit`}
                onClick={this.toggleShowOptions}
                color="secondary"
                className="d-block mx-auto my-3 w-100"
              >
                <span>
                  <Translate contentKey="entity.action.update">Update</Translate>
                </span>
              </Button>
            </AuthorizationChecker>
            <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.HEAD} eventId={eventId}>
              <Button
                tag={Link}
                to={`${match.url}/${selectedEventBudgetId}/delete`}
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
      </div>
    );
  }
}

const mapStateToProps = ({ budget }: IRootState) => ({
  budgetList: budget.entities,
  totalItems: budget.totalItems,
  selectedEventBudgetId: budget.selectedEventBudgetId,
  showActionOptions: budget.showActionOptions,
  eventBudgetTotal: budget.eventBudgetTotal,
  eventRealTotal: budget.eventRealTotal
});

const mapDispatchToProps = {
  getEventBudgetByEventId,
  setSelectedEventBudgetId,
  setShowActionOptions,
  getEventBudgetTotal,
  getEventRealTotal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Budget);
