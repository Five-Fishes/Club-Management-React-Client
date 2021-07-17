import './transaction.scss';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Card, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, IPaginationBaseState } from 'react-jhipster';
import { ITransaction, TransactionStatus } from 'app/shared/model/transaction.model';
import { IRootState } from 'app/shared/reducers';

// tslint:disable-next-line:no-unused-variable
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITransactionCardProps extends StateProps, DispatchProps {
  transaction: ITransaction;
}

export class TransactionCard extends React.Component<ITransactionCardProps> {
  constructor(props: ITransactionCardProps) {
    super(props);
  }

  render() {
    const { transaction } = this.props;

    return transaction ? (
      <Card className="my-3 transaction-card">
        <div className="d-flex justify-content-between">
          <h5 className="rows-overflow-ellipsis">{transaction?.title}</h5>
          <p className="ml-4">
            {transaction.createdDate && <TextFormat type="date" value={transaction.createdDate} format={APP_LOCAL_DATE_FORMAT} />}
          </p>
        </div>
        <p>
          {transaction.transactionType}: RM {transaction.transactionAmount}
        </p>
        <Row className="d-flex justify-content-between">
          <Col xs="4">
            <div
              className={`mt-1 status-tag ${
                transaction.transactionStatus === TransactionStatus.COMPLETED ? 'collected-tag' : 'pending-tag'
              }`}
            >
              {transaction.transactionStatus}
            </div>
          </Col>
          <Col xs="8">
            <p className="text-end text-overflow-ellipsis">{transaction.createdBy}</p>
          </Col>
        </Row>
      </Card>
    ) : null;
  }
}

const mapStateToProps = ({}: IRootState) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionCard);
