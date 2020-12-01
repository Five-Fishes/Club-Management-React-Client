import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './transaction.reducer';
import { ITransaction } from 'app/shared/model/transaction.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITransactionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITransactionUpdateState {
  isNew: boolean;
}

export class TransactionUpdate extends React.Component<ITransactionUpdateProps, ITransactionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    values.createdDate = convertDateTimeToServer(values.createdDate);

    if (errors.length === 0) {
      const { transactionEntity } = this.props;
      const entity = {
        ...transactionEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/transaction');
  };

  render() {
    const { transactionEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.transaction.home.createOrEditLabel">
              <Translate contentKey="clubmanagementApp.transaction.home.createOrEditLabel">Create or edit a Transaction</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : transactionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="transaction-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="transaction-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="eventIdLabel" for="transaction-eventId">
                    <Translate contentKey="clubmanagementApp.transaction.eventId">Event Id</Translate>
                  </Label>
                  <AvField id="transaction-eventId" type="string" className="form-control" name="eventId" />
                </AvGroup>
                <AvGroup>
                  <Label id="receiptIdLabel" for="transaction-receiptId">
                    <Translate contentKey="clubmanagementApp.transaction.receiptId">Receipt Id</Translate>
                  </Label>
                  <AvField id="transaction-receiptId" type="string" className="form-control" name="receiptId" />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="transaction-type">
                    <Translate contentKey="clubmanagementApp.transaction.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="transaction-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && transactionEntity.type) || 'INCOME'}
                  >
                    <option value="INCOME">{translate('clubmanagementApp.TransactionType.INCOME')}</option>
                    <option value="EXPENSE">{translate('clubmanagementApp.TransactionType.EXPENSE')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="amountLabel" for="transaction-amount">
                    <Translate contentKey="clubmanagementApp.transaction.amount">Amount</Translate>
                  </Label>
                  <AvField id="transaction-amount" type="text" name="amount" />
                </AvGroup>
                <AvGroup>
                  <Label id="detailsLabel" for="transaction-details">
                    <Translate contentKey="clubmanagementApp.transaction.details">Details</Translate>
                  </Label>
                  <AvField id="transaction-details" type="text" name="details" />
                </AvGroup>
                <AvGroup>
                  <Label id="receiptUrlLabel" for="transaction-receiptUrl">
                    <Translate contentKey="clubmanagementApp.transaction.receiptUrl">Receipt Url</Translate>
                  </Label>
                  <AvField id="transaction-receiptUrl" type="text" name="receiptUrl" />
                </AvGroup>
                <AvGroup>
                  <Label id="fileNameLabel" for="transaction-fileName">
                    <Translate contentKey="clubmanagementApp.transaction.fileName">File Name</Translate>
                  </Label>
                  <AvField id="transaction-fileName" type="text" name="fileName" />
                </AvGroup>
                <AvGroup>
                  <Label id="fileTypeLabel" for="transaction-fileType">
                    <Translate contentKey="clubmanagementApp.transaction.fileType">File Type</Translate>
                  </Label>
                  <AvField id="transaction-fileType" type="text" name="fileType" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdByLabel" for="transaction-createdBy">
                    <Translate contentKey="clubmanagementApp.transaction.createdBy">Created By</Translate>
                  </Label>
                  <AvField id="transaction-createdBy" type="text" name="createdBy" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdDateLabel" for="transaction-createdDate">
                    <Translate contentKey="clubmanagementApp.transaction.createdDate">Created Date</Translate>
                  </Label>
                  <AvInput
                    id="transaction-createdDate"
                    type="datetime-local"
                    className="form-control"
                    name="createdDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.transactionEntity.createdDate)}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/transaction" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  transactionEntity: storeState.transaction.entity,
  loading: storeState.transaction.loading,
  updating: storeState.transaction.updating,
  updateSuccess: storeState.transaction.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionUpdate);
