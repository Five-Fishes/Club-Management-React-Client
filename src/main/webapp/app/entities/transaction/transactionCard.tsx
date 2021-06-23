import './transaction.scss';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Card } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITransaction, TransactionStatus } from 'app/shared/model/transaction.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity } from 'app/entities/event/event.reducer';

// tslint:disable-next-line:no-unused-variable
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import axios from 'axios';
import { IEvent } from 'app/shared/model/event.model';

export interface ITransactionCardProps extends StateProps, DispatchProps {
  transaction: ITransaction;
}

export interface ITransactionCardState {
  event?: IEvent;
}

export class TransactionCard extends React.Component<ITransactionCardProps, ITransactionCardState> {
  constructor(props: ITransactionCardProps) {
    super(props);
    this.state = {
      event: undefined,
    };
  }

  componentDidMount() {
    if (this.props.transaction.eventId) {
      this.getEvent(this.props.transaction.eventId);
    }
  }

  async getEvent(eventId: number) {
    const event = await axios.get<IEvent>(`api/events/${eventId}`);
    this.setState({ event: event.data });
  }

  render() {
    const { transaction } = this.props;
    const { event } = this.state;
    return event ? (
      <Card className="my-3 transaction-card">
        <div className="d-flex justify-content-between">
          <h5> {event && event.name} </h5>
          <p>{transaction.createdDate && <TextFormat type="date" value={transaction.createdDate} format={APP_LOCAL_DATE_FORMAT} />}</p>
        </div>

        <div className="d-flex justify-content-between">
          <p>
            {transaction.transactionType}: RM {transaction.transactionAmount}
          </p>
          <p>{transaction.createdBy}</p>
        </div>
        <div className="d-flex justify-content-between">
          <div className={`status-tag ${transaction.transactionStatus === TransactionStatus.COMPLETED ? 'collected-tag' : 'pending-tag'}`}>
            {transaction.transactionStatus}
          </div>
          <p>{transaction.closedBy}</p>
        </div>
      </Card>
    ) : null;
  }
}

const mapDispatchToProps = {};

const mapStateToProps = ({ event }: IRootState) => ({});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionCard);
