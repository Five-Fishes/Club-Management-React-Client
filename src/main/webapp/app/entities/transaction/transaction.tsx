import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
// tslint:disable-next-line:no-unused-variable
import { Translate, getSortState, IPaginationBaseState } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './transaction.reducer';

// tslint:disable-next-line:no-unused-variable
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import CustomTab from 'app/shared/components/customTab/custom-tab';
import { financeTabList } from 'app/shared/util/tab.constants';
import { TransactionCard } from './transactionCard';

import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';

export interface ITransactionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ITransactionState = IPaginationBaseState;

export class Transaction extends React.Component<ITransactionProps, ITransactionState> {
  state: ITransactionState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
  };

  componentDidMount() {
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
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { transactionList } = this.props;
    return (
      <div>
        <h2 id="transaction-heading" className="finance-module-heading">
          <Translate contentKey="clubmanagementApp.transaction.home.title">Transactions</Translate>
        </h2>
        <CustomTab tabList={financeTabList} currentTab="All Transactions" />
        <div className="mx-4">
          <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.HEAD}>
            <Link className="btn btn-action jh-create-entity w-100 my-2" to="/entity/transaction/new">
              <Translate contentKey="entity.action.add">Add</Translate>
            </Link>
          </AuthorizationChecker>
          <div>
            {transactionList && transactionList.length > 0 ? (
              transactionList.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} />)
            ) : (
              <div className="alert alert-warning">
                <Translate contentKey="clubmanagementApp.transaction.home.notFound">No Transactions found</Translate>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ transaction }: IRootState) => ({
  transactionList: transaction.entities,
  totalItems: transaction.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
