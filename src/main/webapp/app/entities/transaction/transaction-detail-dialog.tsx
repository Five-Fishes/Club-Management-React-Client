import React, { ReactElement } from 'react';
import { Row, Col, ModalHeader, ModalBody, ModalFooter, Modal } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, TextFormat } from 'react-jhipster';

// tslint:disable-next-line:no-unused-variable
import { DATE_WITH_MONTH_ABBREVIATION_FORMAT } from 'app/config/constants';
import { ITransaction } from 'app/shared/model/transaction.model';
import moment from 'moment';
import { FinanceComponentListingCardWithButton } from 'app/shared/components/finance-component-listing-card/finance-component-listing-card';

export interface ITransactionDetailDialogProps {
  isOpen: boolean;
  transactionEntity: ITransaction;
  transactionId: number;
  withButton: boolean;
  completedActionButton?: ReactElement;
  invalidActionButton?: ReactElement;
  toggleModal: () => void;
}

export class TransactionDetailDialog extends React.Component<ITransactionDetailDialogProps> {
  render() {
    const { isOpen, toggleModal, withButton, completedActionButton, invalidActionButton } = this.props;
    const {
      eventName,
      transactionType,
      transactionAmount,
      title,
      imageLink,
      receiptUrl,
      description,
      createdDate,
      belongsTo,
      closedBy,
    } = this.props.transactionEntity;
    return (
      <Modal size="lg" centered isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <h2>
            <Translate contentKey="clubmanagementApp.transaction.detail.title">Transaction</Translate>
          </h2>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <span className="card-item d-block mb-1">
                <span>
                  <Translate contentKey="clubmanagementApp.transaction.title">TITLE</Translate>:&nbsp;
                  <span className="font-weight-bolder text-dark">{title ?? 'N/A'}</span>
                </span>
              </span>
              <span className="card-item d-block mb-1">
                <span>
                  <Translate contentKey="clubmanagementApp.transaction.eventName">Event Name</Translate>:&nbsp;
                  <span className="font-weight-bolder text-dark">{eventName ?? 'N/A'}</span>
                </span>
              </span>
              <span className="card-item d-block mb-1">
                <span className={transactionType === 'INCOME' ? 'text-success' : 'text-danger'}>
                  <Translate contentKey={`clubmanagementApp.transaction.${transactionType?.toLowerCase()}`}>{transactionType}</Translate>
                  :&nbsp;
                  <span>{transactionAmount?.toFixed(2)}</span>
                </span>
              </span>
              <span className="card-item d-block">
                <Translate contentKey="clubmanagementApp.transaction.description">Description</Translate>:&nbsp;
                <span className="font-weight-bolder text-dark">{description ?? '-'}</span>
              </span>
              <span className="card-item d-block">
                <Translate contentKey="clubmanagementApp.transaction.receiptUrl">Receipt URL</Translate>:&nbsp;
                <span className="font-weight-bolder text-dark">{receiptUrl}</span>
              </span>
              <span className="card-item d-block">
                <Translate contentKey="clubmanagementApp.transaction.imageLink">Image Link</Translate>:&nbsp;
                <span className="font-weight-bolder text-dark">{imageLink}</span>
              </span>
              <span className="card-item d-block">
                <Translate contentKey="clubmanagementApp.transaction.closedBy">Closed By</Translate>:&nbsp;
                <span className="font-weight-bolder text-dark">{closedBy ?? 'N/A'}</span>
              </span>
              <span className="card-item d-block">
                <Translate contentKey="clubmanagementApp.transaction.belongsTo">Belongs to</Translate>:&nbsp;
                <span className="font-weight-bolder text-dark">{belongsTo}</span>
              </span>
              <span className="card-item d-block">
                <Translate contentKey="clubmanagementApp.transaction.createdDate">Created Date</Translate>:
                <span className="font-weight-bolder text-dark">
                  {moment(createdDate ?? '').format(DATE_WITH_MONTH_ABBREVIATION_FORMAT)}
                </span>
              </span>
            </Col>
          </Row>
        </ModalBody>
        {withButton && (
          <ModalFooter className="justify-content-between mx-3">
            {invalidActionButton}
            {completedActionButton}
          </ModalFooter>
        )}
      </Modal>
    );
  }
}

export default TransactionDetailDialog;
