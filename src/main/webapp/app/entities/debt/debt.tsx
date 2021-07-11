import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import {
  getEntities,
  setSelectedDebtId,
  updateEntityStatus,
  setShowBadDebtDialog,
  setShowCollectDialog,
  setSelectedDebt,
  setShowTransactionDetailsDialog,
} from './debt.reducer';
import '../../styles/finance-module.scss';
// tslint:disable-next-line:no-unused-variable
import { DATE_WITH_MONTH_ABBREVIATION_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import CustomTab from 'app/shared/components/customTab/custom-tab';
import { financeTabList } from 'app/shared/util/tab.constants';
import moment from 'moment';
import FinanceConfirmationDialog from 'app/shared/components/financeConfirmationDialog/finance-confirmation-dialog';
import { FinanceComponentListingCardWithButton } from 'app/shared/components/finance-component-listing-card/finance-component-listing-card';
import { ITransaction, TransactionStatus } from 'app/shared/model/transaction.model';
import { TransactionDetailDialog } from 'app/entities/transaction/transaction-detail-dialog';
import { FinanceActionButton } from 'app/shared/components/finance-action-button/finance-action-button';

export interface IDebtProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IDebtState = IPaginationBaseState;

export class Debt extends React.Component<IDebtProps, IDebtState> {
  state: IDebtState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
  };

  constructor(props: IDebtProps) {
    super(props);
    this.sortEntities = this.sortEntities.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.getEntities = this.getEntities.bind(this);
    this.toggleTransactionDetailsModal = this.toggleTransactionDetailsModal.bind(this);
    this.collect = this.collect.bind(this);
    this.badDebt = this.badDebt.bind(this);
    this.closeTransactionDetailsModal = this.closeTransactionDetailsModal.bind(this);
    this.toggleShowCollectDialog = this.toggleShowCollectDialog.bind(this);
    this.toggleShowBadDebtDialog = this.toggleShowBadDebtDialog.bind(this);
  }

  componentDidMount() {
    this.getEntities();
  }

  sortEntities(): void {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}`);
  }

  handlePagination(activePage: number): void {
    this.setState({ activePage }, () => this.sortEntities());
  }

  getEntities(): void {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  }

  collect(debtId?: number): void {
    if (typeof debtId === 'undefined') return;
    this.props.updateEntityStatus(debtId, TransactionStatus.COMPLETED);
    this.props.setShowCollectDialog(!this.props.showCollectDialog);
    this.props.setShowTransactionDetailsDialog(false);
  }

  badDebt(debtId?: number): void {
    if (typeof debtId === 'undefined') return;
    this.props.updateEntityStatus(debtId, TransactionStatus.INVALID);
    this.props.setShowBadDebtDialog(!this.props.showBadDebtDialog);
    this.props.setShowTransactionDetailsDialog(false);
  }

  closeTransactionDetailsModal(): void {
    this.props.setShowTransactionDetailsDialog(false);
  }

  toggleTransactionDetailsModal(debt: ITransaction): void {
    this.props.setSelectedDebt(debt);
    this.props.setShowTransactionDetailsDialog(!this.props.showTransactionDetailsDialog);
  }

  toggleShowCollectDialog(debtId?: number): void {
    if (typeof debtId !== 'undefined') {
      this.props.setSelectedDebtId(debtId);
    }
    this.props.setShowCollectDialog(!this.props.showCollectDialog);
  }

  toggleShowBadDebtDialog(debtId?: number): void {
    if (typeof debtId !== 'undefined') {
      this.props.setSelectedDebtId(debtId);
    }
    this.props.setShowBadDebtDialog(!this.props.showBadDebtDialog);
  }

  render() {
    const {
      selectedDebt,
      debtList,
      totalItems,
      showCollectDialog,
      showBadDebtDialog,
      showTransactionDetailsDialog,
      selectedDebtId,
    } = this.props;
    const { activePage, itemsPerPage } = this.state;
    return (
      <div>
        <FinanceConfirmationDialog
          transactionId={selectedDebtId}
          isOpen={showCollectDialog}
          entityType="debt"
          action="collect"
          confirmQuestion="Are you sure you want to change status of this Debt as collected?"
          confirmButtonName="Collect"
          confirmButtonColor="success"
          confirmActionCallback={this.collect}
          toggleModal={this.toggleShowCollectDialog}
        />
        <FinanceConfirmationDialog
          transactionId={selectedDebtId}
          isOpen={showBadDebtDialog}
          entityType="debt"
          action="badDebt"
          confirmQuestion="Are you sure you want to change status of this Debt as bad debt?"
          confirmButtonName="Bad Debt"
          confirmButtonColor="cancel"
          confirmActionCallback={this.badDebt}
          toggleModal={this.toggleShowBadDebtDialog}
        />
        <TransactionDetailDialog
          transactionEntity={selectedDebt}
          isOpen={showTransactionDetailsDialog}
          withButton
          transactionId={selectedDebtId}
          invalidActionButton={
            <FinanceActionButton
              name={<Translate contentKey="entity.action.badDebt">Bad Debt</Translate>}
              color="cancel"
              onClick={this.toggleShowBadDebtDialog}
            />
          }
          completedActionButton={
            <FinanceActionButton
              name={<Translate contentKey="entity.action.collect">Collect</Translate>}
              color="success"
              onClick={this.toggleShowCollectDialog}
            />
          }
          toggleModal={this.closeTransactionDetailsModal}
        />
        <h2 id="debt-heading" className="finance-module-heading">
          <Translate contentKey="clubmanagementApp.debt.home.title">Debts</Translate>
        </h2>
        <CustomTab tabList={financeTabList} currentTab="Members Debt" />
        <div className="mx-4">
          <div>
            {debtList && debtList.length > 0 ? (
              debtList.map((debt, i) => (
                // tslint:disable
                <FinanceComponentListingCardWithButton
                  key={`debt-${debt.id}`}
                  completedAction="collect"
                  invalidAction="badDebt"
                  completedActionColor="success"
                  invalidActionColor="cancel"
                  completedActionCallback={this.toggleShowCollectDialog.bind(this, debt.id)}
                  invalidActionCallback={this.toggleShowBadDebtDialog.bind(this, debt.id)}
                  onClick={this.toggleTransactionDetailsModal.bind(this, debt)}
                  withButton
                >
                  {!!debt.title ? (
                    <span className="card-item d-block mb-1 finance-title">
                      <span>
                        <span className="font-weight-bolder text-dark">{debt.title}</span>
                      </span>
                    </span>
                  ) : (
                    <span className="card-item d-block mb-1 finance-title">
                      <span>
                        <Translate contentKey="clubmanagementApp.transaction.title">TITLE</Translate>:&nbsp;
                        <span className="font-weight-bolder text-dark">N/A</span>
                      </span>
                    </span>
                  )}
                  <span className="card-item d-block mb-1">
                    <span>
                      <Translate contentKey="clubmanagementApp.transaction.eventName">Event Name</Translate>:&nbsp;
                      {!!debt.eventName ? (
                        <span className="font-weight-bolder text-dark">{debt.eventName}</span>
                      ) : (
                        <span className="font-weight-bolder text-dark">N/A</span>
                      )}
                    </span>
                  </span>
                  <span className="card-item d-block mb-1">
                    <span className="text-success">
                      <Translate contentKey="clubmanagementApp.transaction.income">INCOME</Translate>:&nbsp;
                      <span>RM{!!debt.transactionAmount ? debt.transactionAmount.toFixed(2) : '0.00'}</span>
                    </span>
                  </span>
                  <span className="card-item d-block">
                    <span>
                      <Translate contentKey="clubmanagementApp.transaction.belongsTo">Belongs to</Translate>:&nbsp;
                      <span className="font-weight-bolder text-dark">{debt.createdBy}</span>
                    </span>
                  </span>
                  <span className="card-item d-block">
                    <span>
                      <span className="font-weight-bolder text-dark">
                        {moment(debt.createdDate).format(DATE_WITH_MONTH_ABBREVIATION_FORMAT)}
                      </span>
                    </span>
                  </span>
                </FinanceComponentListingCardWithButton>
              ))
            ) : (
              <div className="alert alert-warning">
                <Translate contentKey="clubmanagementApp.debt.home.notFound">No Debts found</Translate>
              </div>
            )}
          </div>
          <div className={debtList && debtList.length > 0 ? '' : 'd-none'}>
            <Row className="justify-content-center">
              <JhiItemCount page={activePage} total={totalItems} itemsPerPage={itemsPerPage} i18nEnabled />
            </Row>
            <Row className="justify-content-center">
              <JhiPagination
                activePage={activePage}
                onSelect={this.handlePagination}
                maxButtons={5}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
              />
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ debt }: IRootState) => ({
  debtList: debt.entities,
  totalItems: debt.totalItems,
  selectedDebtId: debt.selectedDebtId,
  selectedDebt: debt.selectedDebt,
  showTransactionDetailsDialog: debt.showTransactionDetailsDialog,
  showCollectDialog: debt.showCollectDialog,
  showBadDebtDialog: debt.showBadDebtDialog,
});

const mapDispatchToProps = {
  getEntities,
  updateEntityStatus,
  setSelectedDebtId,
  setSelectedDebt,
  setShowTransactionDetailsDialog,
  setShowCollectDialog,
  setShowBadDebtDialog,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Debt);
