import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './transaction.reducer';
import { ITransaction } from 'app/shared/model/transaction.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

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
    const { transactionList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="transaction-heading">
          <Translate contentKey="clubmanagementApp.transaction.home.title">Transactions</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="clubmanagementApp.transaction.home.createLabel">Create new Transaction</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {transactionList && transactionList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('eventId')}>
                    <Translate contentKey="clubmanagementApp.transaction.eventId">Event Id</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('receiptId')}>
                    <Translate contentKey="clubmanagementApp.transaction.receiptId">Receipt Id</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('type')}>
                    <Translate contentKey="clubmanagementApp.transaction.type">Type</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('amount')}>
                    <Translate contentKey="clubmanagementApp.transaction.amount">Amount</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('details')}>
                    <Translate contentKey="clubmanagementApp.transaction.details">Details</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('receiptUrl')}>
                    <Translate contentKey="clubmanagementApp.transaction.receiptUrl">Receipt Url</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('fileName')}>
                    <Translate contentKey="clubmanagementApp.transaction.fileName">File Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('fileType')}>
                    <Translate contentKey="clubmanagementApp.transaction.fileType">File Type</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('createdBy')}>
                    <Translate contentKey="clubmanagementApp.transaction.createdBy">Created By</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('createdDate')}>
                    <Translate contentKey="clubmanagementApp.transaction.createdDate">Created Date</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {transactionList.map((transaction, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${transaction.id}`} color="link" size="sm">
                        {transaction.id}
                      </Button>
                    </td>
                    <td>{transaction.eventId}</td>
                    <td>{transaction.receiptId}</td>
                    <td>
                      <Translate contentKey={`clubmanagementApp.TransactionType.${transaction.transactionType}`} />
                    </td>
                    <td>{transaction.transactionAmount}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.receiptUrl}</td>
                    <td>{transaction.fileName}</td>
                    <td>{transaction.fileType}</td>
                    <td>{transaction.createdBy}</td>
                    <td>
                      <TextFormat type="date" value={transaction.createdDate ?? ''} format={APP_DATE_FORMAT} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${transaction.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${transaction.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${transaction.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="clubmanagementApp.transaction.home.notFound">No Transactions found</Translate>
            </div>
          )}
        </div>
        <div className={transactionList && transactionList.length > 0 ? '' : 'd-none'}>
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
