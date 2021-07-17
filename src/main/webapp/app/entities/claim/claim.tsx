import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Row } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import {
  getEntities,
  setSelectedClaimId,
  updateEntityStatus,
  setShowDismissDialog,
  setShowPayDialog,
  setSelectedClaim,
  setShowTransactionDetailsDialog,
} from './claim.reducer';
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

export interface IClaimProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IClaimState = IPaginationBaseState;

export class Claim extends React.Component<IClaimProps, IClaimState> {
  state: IClaimState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
  };

  constructor(props: IClaimProps) {
    super(props);
    this.sortEntities = this.sortEntities.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.getEntities = this.getEntities.bind(this);
    this.toggleTransactionDetailsModal = this.toggleTransactionDetailsModal.bind(this);
    this.pay = this.pay.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.closeTransactionDetailsModal = this.closeTransactionDetailsModal.bind(this);
    this.toggleShowPayDialog = this.toggleShowPayDialog.bind(this);
    this.toggleShowDismissDialog = this.toggleShowDismissDialog.bind(this);
  }

  componentDidMount() {
    this.getEntities();
  }

  sortEntities(): void {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination(activePage: number): void {
    this.setState({ activePage }, () => this.sortEntities());
  }

  getEntities(): void {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  }

  pay(): void {
    if (typeof this.props.selectedClaimId === 'undefined') return;
    this.props.updateEntityStatus(this.props.selectedClaimId, TransactionStatus.COMPLETED);
    this.props.setShowPayDialog(!this.props.showPayDialog);
    this.props.setShowTransactionDetailsDialog(false);
  }

  dismiss(): void {
    if (typeof this.props.selectedClaimId === 'undefined') return;
    this.props.updateEntityStatus(this.props.selectedClaimId, TransactionStatus.INVALID);
    this.props.setShowDismissDialog(!this.props.showDismissDialog);
    this.props.setShowTransactionDetailsDialog(false);
  }

  closeTransactionDetailsModal(): void {
    this.props.setShowTransactionDetailsDialog(false);
  }

  toggleTransactionDetailsModal(claim: ITransaction): void {
    this.props.setSelectedClaim(claim);
    this.props.setShowTransactionDetailsDialog(!this.props.showTransactionDetailsDialog);
  }

  toggleShowPayDialog(claimId?: number): void {
    if (typeof claimId !== 'undefined') {
      this.props.setSelectedClaimId(claimId);
    }
    this.props.setShowPayDialog(!this.props.showPayDialog);
  }

  toggleShowDismissDialog(claimId?: number): void {
    if (typeof claimId !== 'undefined') {
      this.props.setSelectedClaimId(claimId);
    }
    this.props.setShowDismissDialog(!this.props.showDismissDialog);
  }

  render() {
    const {
      selectedClaim,
      claimList,
      totalItems,
      showPayDialog,
      showDismissDialog,
      showTransactionDetailsDialog,
      selectedClaimId,
    } = this.props;
    const { activePage, itemsPerPage } = this.state;
    return (
      <div>
        <FinanceConfirmationDialog
          transactionId={selectedClaimId}
          isOpen={showPayDialog}
          entityType="claim"
          action="pay"
          confirmQuestion="Are you sure you want to change status of this Claim as paid?"
          confirmButtonName="Pay"
          confirmButtonColor="success"
          confirmActionCallback={this.pay}
          toggleModal={this.toggleShowPayDialog}
        />
        <FinanceConfirmationDialog
          transactionId={selectedClaimId}
          isOpen={showDismissDialog}
          entityType="claim"
          action="dismiss"
          confirmQuestion="Are you sure you want to change status of this Claim as dismissed?"
          confirmButtonName="Dismiss"
          confirmButtonColor="cancel"
          confirmActionCallback={this.dismiss}
          toggleModal={this.toggleShowDismissDialog}
        />
        <TransactionDetailDialog
          transactionEntity={selectedClaim}
          isOpen={showTransactionDetailsDialog}
          withButton
          transactionId={selectedClaimId}
          invalidActionButton={
            <FinanceActionButton
              name={<Translate contentKey="entity.action.dismiss">Dismiss</Translate>}
              color="cancel"
              onClick={this.toggleShowDismissDialog}
            />
          }
          completedActionButton={
            <FinanceActionButton
              name={<Translate contentKey="entity.action.pay">Pay</Translate>}
              color="success"
              onClick={this.toggleShowPayDialog}
            />
          }
          toggleModal={this.closeTransactionDetailsModal}
        />
        <h2 id="claim-heading" className="finance-module-heading">
          <Translate contentKey="clubmanagementApp.claim.home.title">Claims</Translate>
        </h2>
        <CustomTab tabList={financeTabList} currentTab="CC Debt" key={Date.now()} />
        <div className="mx-4">
          <div>
            {claimList && claimList.length > 0 ? (
              claimList.map((claim, i) => (
                // tslint:disable
                <FinanceComponentListingCardWithButton
                  key={`claim-${claim.id}`}
                  completedAction="pay"
                  invalidAction="dismiss"
                  completedActionColor="success"
                  invalidActionColor="cancel"
                  completedActionCallback={this.toggleShowPayDialog.bind(this, claim.id)}
                  invalidActionCallback={this.toggleShowDismissDialog.bind(this, claim.id)}
                  onClick={this.toggleTransactionDetailsModal.bind(this, claim)}
                  withButton
                >
                  {!!claim.title ? (
                    <span className="card-item d-block mb-1 finance-title">
                      <span>
                        <span className="font-weight-bolder text-dark">{claim.title}</span>
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
                      {!!claim.eventName ? (
                        <span className="font-weight-bolder text-dark">{claim.eventName}</span>
                      ) : (
                        <span className="font-weight-bolder text-dark">N/A</span>
                      )}
                    </span>
                  </span>
                  <span className="card-item d-block mb-1">
                    <span className="text-danger">
                      <Translate contentKey="clubmanagementApp.transaction.expense">EXPENSE</Translate>:&nbsp;
                      <span>RM{!!claim.transactionAmount ? claim.transactionAmount.toFixed(2) : '0.00'}</span>
                    </span>
                  </span>
                  <span className="card-item d-block">
                    <span>
                      <Translate contentKey="clubmanagementApp.transaction.belongsTo">Belongs to</Translate>:&nbsp;
                      <span className="font-weight-bolder text-dark">{claim.createdBy}</span>
                    </span>
                  </span>
                  <span className="card-item d-block">
                    <span>
                      <span className="font-weight-bolder text-dark">
                        {moment(claim.createdDate).format(DATE_WITH_MONTH_ABBREVIATION_FORMAT)}
                      </span>
                    </span>
                  </span>
                </FinanceComponentListingCardWithButton>
              ))
            ) : (
              <div className="alert alert-warning">
                <Translate contentKey="clubmanagementApp.claim.home.notFound">No Claims found</Translate>
              </div>
            )}
          </div>
          <div className={claimList && claimList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ claim }: IRootState) => ({
  claimList: claim.entities,
  totalItems: claim.totalItems,
  selectedClaimId: claim.selectedClaimId,
  selectedClaim: claim.selectedClaim,
  showTransactionDetailsDialog: claim.showTransactionDetailsDialog,
  showPayDialog: claim.showPayDialog,
  showDismissDialog: claim.showDismissDialog,
});

const mapDispatchToProps = {
  getEntities,
  updateEntityStatus,
  setSelectedClaimId,
  setSelectedClaim,
  setShowTransactionDetailsDialog,
  setShowPayDialog,
  setShowDismissDialog,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Claim);
