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
  setShowActionOptions,
  setShowBadDebtDialog,
  setShowCollectDialog,
} from './debt.reducer';
import { DebtStatus } from 'app/shared/model/debt.model';
import '../../styles/finance-module.scss';
// tslint:disable-next-line:no-unused-variable
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { ListingCard } from 'app/shared/components/listing-card/listing-card';
import CustomTab from 'app/shared/components/customTab/custom-tab';
import { financeTabList } from 'app/shared/util/tab.constants';
import moment from 'moment';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import FinanceConfirmationDialog from 'app/shared/components/financeConfirmationDialog/finance-confirmation-dialog';

export interface IDebtProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IDebtState = IPaginationBaseState;

export class Debt extends React.Component<IDebtProps, IDebtState> {
  state: IDebtState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
  };

  constructor(props) {
    super(props);
    this.sortEntities = this.sortEntities.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.getEntities = this.getEntities.bind(this);
    this.collect = this.collect.bind(this);
    this.badDebt = this.badDebt.bind(this);
    this.toggleShowOptions = this.toggleShowOptions.bind(this);
    this.toggleShowCollectDialog = this.toggleShowCollectDialog.bind(this);
    this.toggleShowBadDebtDialog = this.toggleShowBadDebtDialog.bind(this);
  }

  componentDidMount() {
    this.getEntities();
  }

  sortEntities = (): void => {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}`);
  };

  handlePagination = (activePage: number): void => {
    this.setState({ activePage }, () => this.sortEntities());
  };

  getEntities = (): void => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  showCardAction = (debtId: number): void => {
    this.props.setSelectedDebtId(debtId);
    this.props.setShowActionOptions(true);
  };

  collect = (): void => {
    this.props.updateEntityStatus(this.props.selectedDebtId, DebtStatus.COLLECTED);
    this.props.setShowCollectDialog(!this.props.showCollectDialog);
  };

  badDebt = (): void => {
    this.props.updateEntityStatus(this.props.selectedDebtId, DebtStatus.UNREACHABLE);
    this.props.setShowBadDebtDialog(!this.props.showBadDebtDialog);
  };

  toggleShowOptions = (): void => {
    this.props.setShowActionOptions(!this.props.showActionOptions);
  };

  toggleShowCollectDialog = (): void => {
    this.props.setShowActionOptions(false);
    this.props.setShowCollectDialog(!this.props.showCollectDialog);
  };

  toggleShowBadDebtDialog = (): void => {
    this.props.setShowActionOptions(false);
    this.props.setShowBadDebtDialog(!this.props.showBadDebtDialog);
  };

  render() {
    const { debtList, totalItems, showCollectDialog, showBadDebtDialog, showActionOptions } = this.props;
    const { activePage, itemsPerPage } = this.state;
    return (
      <div>
        <FinanceConfirmationDialog
          isOpen={showCollectDialog}
          entityType="debt"
          action="collect"
          confirmQuestion="Are you sure you want to change status of this Debt as collected?"
          confirmButtonColor="success"
          confirmActionCallback={this.collect}
          toggleModal={this.toggleShowCollectDialog}
        />
        <FinanceConfirmationDialog
          isOpen={showBadDebtDialog}
          entityType="debt"
          action="badDebt"
          confirmQuestion="Are you sure you want to change status of this Debt as bad debt?"
          confirmButtonColor="cancel"
          confirmActionCallback={this.badDebt}
          toggleModal={this.toggleShowBadDebtDialog}
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
                <ListingCard
                  key={`debt-${debt.id}`}
                  showActionMenu
                  title={debt.eventName}
                  date={moment(debt.createdDate).format(APP_LOCAL_DATE_FORMAT)}
                  actionMenuHandler={this.showCardAction.bind(this, debt.id)}
                  actionMenuAuthorizationProps={{
                    ccRole: CCRole.ADMIN,
                  }}
                >
                  <span className="card-item d-block mb-1">
                    <span>
                      <Translate contentKey="clubmanagementApp.debt.income">INCOME</Translate>:&nbsp;
                      <span className="font-weight-bolder text-dark">{debt.amount}</span>
                    </span>
                  </span>
                  <span className="card-item d-block">
                    <span>
                      <span className="font-weight-bolder text-dark">{debt.userName}</span>:&nbsp;
                      <Translate contentKey="clubmanagementApp.debt.participationFee">Participation Fee</Translate>
                    </span>
                  </span>
                </ListingCard>
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
          <Modal size="sm" centered isOpen={showActionOptions} toggle={this.toggleShowOptions}>
            <ModalHeader toggle={this.toggleShowOptions} />
            <ModalBody>
              <h2 className="text-center">Options</h2>
              <Button color="primary" className="d-block mx-auto my-3 w-75" onClick={this.toggleShowCollectDialog}>
                <span>
                  <Translate contentKey="entity.action.collect">Collect</Translate>
                </span>
              </Button>
              <Button color="cancel" className="d-block mx-auto my-3 w-75" onClick={this.toggleShowBadDebtDialog}>
                <span>
                  <Translate contentKey="entity.action.badDebt">Bad Debt</Translate>
                </span>
              </Button>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ debt }: IRootState) => ({
  debtList: debt.entities,
  totalItems: debt.totalItems,
  selectedDebtId: debt.selectedDebtId,
  showActionOptions: debt.showActionOptions,
  showCollectDialog: debt.showCollectDialog,
  showBadDebtDialog: debt.showBadDebtDialog,
});

const mapDispatchToProps = {
  getEntities,
  updateEntityStatus,
  setSelectedDebtId,
  setShowActionOptions,
  setShowCollectDialog,
  setShowBadDebtDialog,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Debt);
