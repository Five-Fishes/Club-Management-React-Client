import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './debt.reducer';
import { IDebt } from 'app/shared/model/debt.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDebtDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DebtDetail extends React.Component<IDebtDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { debtEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="clubmanagementApp.debt.detail.title">Debt</Translate> [<b>{debtEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="receiptId">
                <Translate contentKey="clubmanagementApp.debt.receiptId">Receipt Id</Translate>
              </span>
            </dt>
            <dd>{debtEntity.receiptId}</dd>
            <dt>
              <span id="eventAttendeeId">
                <Translate contentKey="clubmanagementApp.debt.eventAttendeeId">Event Attendee Id</Translate>
              </span>
            </dt>
            <dd>{debtEntity.eventAttendeeId}</dd>
            <dt>
              <span id="amount">
                <Translate contentKey="clubmanagementApp.debt.amount">Amount</Translate>
              </span>
            </dt>
            <dd>{debtEntity.amount}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="clubmanagementApp.debt.status">Status</Translate>
              </span>
            </dt>
            <dd>{debtEntity.status}</dd>
            <dt>
              <span id="receiptUrl">
                <Translate contentKey="clubmanagementApp.debt.receiptUrl">Receipt Url</Translate>
              </span>
            </dt>
            <dd>{debtEntity.receiptUrl}</dd>
            <dt>
              <span id="fileName">
                <Translate contentKey="clubmanagementApp.debt.fileName">File Name</Translate>
              </span>
            </dt>
            <dd>{debtEntity.fileName}</dd>
            <dt>
              <span id="fileType">
                <Translate contentKey="clubmanagementApp.debt.fileType">File Type</Translate>
              </span>
            </dt>
            <dd>{debtEntity.fileType}</dd>
          </dl>
          <Button tag={Link} to="/entity/debt" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/debt/${debtEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ debt }: IRootState) => ({
  debtEntity: debt.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DebtDetail);
