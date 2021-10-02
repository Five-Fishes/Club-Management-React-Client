import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './transaction.reducer';
import { ITransaction } from 'app/shared/model/transaction.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITransactionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TransactionDetail extends React.Component<ITransactionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { transactionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="clubmanagementApp.transaction.detail.title">Transaction</Translate> [<b>{transactionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="eventId">
                <Translate contentKey="clubmanagementApp.transaction.eventId">Event Id</Translate>
              </span>
            </dt>
            <dd>{transactionEntity.eventId}</dd>
            <dt>
              <span id="receiptId">
                <Translate contentKey="clubmanagementApp.transaction.receiptId">Receipt Id</Translate>
              </span>
            </dt>
            <dd>{transactionEntity.transactionType}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="clubmanagementApp.transaction.type">Type</Translate>
              </span>
            </dt>
            <dd>{transactionEntity.transactionType}</dd>
            <dt>
              <span id="transactionAmount">
                <Translate contentKey="clubmanagementApp.transaction.amount">Amount</Translate>
              </span>
            </dt>
            <dd>{transactionEntity.transactionAmount}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="clubmanagementApp.transaction.details">Description</Translate>
              </span>
            </dt>
            <dd>{transactionEntity.description}</dd>
            <dt>
              <span id="transactionStatus">
                <Translate contentKey="clubmanagementApp.transaction.receiptUrl">Status</Translate>
              </span>
            </dt>
            <dd>{transactionEntity.transactionStatus}</dd>
            <dt>
              <span id="title">
                <Translate contentKey="clubmanagementApp.transaction.fileName">Title</Translate>
              </span>
            </dt>
            <dd>{transactionEntity.title}</dd>
            <dt>
              <span id="closedBy">
                <Translate contentKey="clubmanagementApp.transaction.fileType">Close By</Translate>
              </span>
            </dt>
            <dd>{transactionEntity.closedBy}</dd>
            <dt>
              <span id="createdBy">
                <Translate contentKey="clubmanagementApp.transaction.createdBy">Created By</Translate>
              </span>
            </dt>
            <dd>{transactionEntity.createdBy}</dd>
            <dt>
              <span id="createdDate">
                <Translate contentKey="clubmanagementApp.transaction.createdDate">Created Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={transactionEntity.createdDate ?? ''} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/transaction" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/transaction/${transactionEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ transaction }: IRootState) => ({
  transactionEntity: transaction.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);
