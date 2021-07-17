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
import { getUpcomingEntities as getEvents } from 'app/entities/event/event.reducer';
import { ITransaction, TransactionStatus } from 'app/shared/model/transaction.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import eventModal from 'app/shared/components/eventModal/event-modal';
import transaction from './transaction';

export interface ITransactionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITransactionUpdateState {
  isNew: boolean;
  fileURL?: string;
  transactionFile?: File;
  transactionType?: string;
}

export class TransactionUpdate extends React.Component<ITransactionUpdateProps, ITransactionUpdateState> {
  constructor(props: ITransactionUpdateProps) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      fileURL: '',
      transactionFile: undefined,
      transactionType: 'INCOME',
    };

    this.setPreview = this.setPreview.bind(this);
    this.resetPreview = this.resetPreview.bind(this);
    this.setTransactionType = this.setTransactionType.bind(this);
  }

  componentWillUpdate(nextProps: ITransactionUpdateProps, nextState: ITransactionUpdateState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
      this.props.getEvents();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  setPreview(event: { target: HTMLInputElement }): void {
    const files = event.target.files;
    if (files) {
      this.setState({
        fileURL: URL.createObjectURL(files[0]),
        transactionFile: files[0],
      });
    }
  }

  resetPreview(): void {
    this.setState({
      fileURL: '',
      transactionFile: undefined,
    });
  }

  setTransactionType(event: { target: HTMLInputElement }): void {
    if (event.target.value) {
      this.setState({
        transactionType: event.target.value,
      });
    }
  }

  saveEntity = (event: any, errors: any, values: any) => {
    values.createdDate = convertDateTimeToServer(values.createdDate);

    if (errors.length === 0) {
      const { transactionEntity } = this.props;
      const entity = {
        ...transactionEntity,
        ...values,
        multipartFile: this.state.transactionFile,
      };
      const entityFormData = this.convertToFormData(entity);

      if (this.state.isNew) {
        this.props.createEntity(entityFormData);
      } else {
        this.props.updateEntity(entityFormData);
      }
    }
  };

  convertToFormData(transactionEntity: ITransaction): FormData {
    const formData = new FormData();
    formData.append('eventId', (transactionEntity.eventId as any) ?? '');
    formData.append('title', transactionEntity.title ?? '');
    formData.append('transactionType', transactionEntity.transactionType ?? '');
    formData.append('transactionAmount', transactionEntity.transactionAmount + '' ?? '0');
    formData.append('transactionStatus', transactionEntity.transactionStatus ?? TransactionStatus.PENDING);
    formData.append('description', transactionEntity.description ?? '');
    formData.append('createdDate', transactionEntity.createdDate?.toISOString() ?? '');
    formData.append('createdBy', transactionEntity.createdBy ?? '');
    formData.append('closedBy', transactionEntity.closedBy ?? '');
    formData.append('transactionDate', transactionEntity.transactionDate?.toISOString() ?? '');

    if (transactionEntity.multipartFile !== undefined && transactionEntity.multipartFile.size > 0) {
      formData.append('multipartFile', transactionEntity.multipartFile);
    }
    if (!this.state.isNew) {
      formData.append('id', String(transactionEntity.id) ?? '');
    }
    return formData;
  }

  handleClose = () => {
    this.props.history.push('/entity/transaction');
  };

  render() {
    const { transactionEntity, loading, updating, events, userId } = this.props;
    const { isNew, transactionType } = this.state;

    return (
      <div className="mx-4">
        <Row className="justify-content-center">
          <Col md="8">
            <h1 id="clubmanagementApp.transaction.home.createOrEditLabel">
              {isNew ? (
                <Translate contentKey="clubmanagementApp.transaction.home.createLabel">Create a Transaction</Translate>
              ) : (
                <Translate contentKey="clubmanagementApp.transaction.home.editLabel">Update Transaction</Translate>
              )}
            </h1>
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
                  <Label id="multipartFileLabel" for="transaction-multipartFile">
                    <Translate contentKey="clubmanagementApp.transaction.receipt">Receipt</Translate>
                  </Label>
                  {this.state.fileURL ? (
                    <div>
                      <Button className="reset-preview bg-transparent" onClick={this.resetPreview}>
                        <FontAwesomeIcon icon="times" size="xs" color="grey" />
                      </Button>
                      <img className="preview" src={this.state.fileURL} />
                    </div>
                  ) : (
                    <AvField
                      id="transaction-multipartFile"
                      type="file"
                      accept="image/*"
                      name="multipartFile"
                      onChange={this.setPreview}
                      validate={{
                        required: { value: transactionType === 'EXPENSE', errorMessage: 'Please upload an receipt' },
                      }}
                    />
                  )}
                </AvGroup>

                <AvGroup>
                  <Label id="eventIdLabel" for="transaction-eventId">
                    <Translate contentKey="clubmanagementApp.transaction.event">Event</Translate>
                  </Label>

                  <AvField id="transaction-eventId" type="select" className="form-control" name="eventId">
                    <option value="">—</option>
                    {events
                      ? events.map(event => (
                          <option value={event.id} key={event.id}>
                            {event.name}
                          </option>
                        ))
                      : null}
                  </AvField>
                </AvGroup>
                <AvGroup>
                  <Label id="titleLabel" for="transaction-title">
                    <Translate contentKey="clubmanagementApp.transaction.title">Title</Translate>
                  </Label>
                  <AvField
                    id="transaction-receiptId"
                    type="string"
                    className="form-control"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: 'Please enter a title' },
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="transaction-title">
                    <Translate contentKey="clubmanagementApp.transaction.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="transaction-type"
                    type="select"
                    className="form-control"
                    name="transactionType"
                    value={(!isNew && transactionEntity.transactionType) || 'INCOME'}
                    onChange={this.setTransactionType}
                  >
                    <option value="INCOME">{translate('clubmanagementApp.TransactionType.INCOME')}</option>
                    <option value="EXPENSE">{translate('clubmanagementApp.TransactionType.EXPENSE')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="amountLabel" for="transaction-amount">
                    <Translate contentKey="clubmanagementApp.transaction.amount">Amount</Translate>
                  </Label>
                  <AvField
                    id="transaction-amount"
                    type="number"
                    name="transactionAmount"
                    validate={{
                      required: { value: true, errorMessage: 'Please enter an amount for this budget' },
                      min: { value: 0, errorMessage: 'Amount cannot be less than 0' },
                      pattern: {
                        value: '^([0-9]*.?[0-9]{1,2})$',
                        errorMessage: 'Please enter a valid amount with max of 2 decimal values',
                      },
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="transaction-description">
                    <Translate contentKey="clubmanagementApp.transaction.description">Description</Translate>
                  </Label>
                  <AvField id="transaction-description" rows="3" type="textarea" name="description" />
                </AvGroup>
                <AvGroup hidden>
                  <Label id="createdByLabel" for="transaction-createdBy">
                    <Translate contentKey="clubmanagementApp.transaction.createdBy">Created By</Translate>
                  </Label>
                  <AvField id="transaction-createdBy" type="text" name="createdBy" value={userId} />
                </AvGroup>
                <div className="general-buttonContainer--flexContainer">
                  <Button className="general-button--width" tag={Link} id="cancel-save" to="/entity/transaction" replace color="cancel">
                    <Translate contentKey="entity.action.cancel">Cancel</Translate>
                  </Button>
                  &nbsp;
                  {isNew ? (
                    <Button className="general-button--width" color="action" id="save-entity" type="submit" disabled={updating}>
                      <Translate contentKey="entity.action.create">Create</Translate>
                    </Button>
                  ) : (
                    <Button className="general-button--width" color="action" id="save-entity" type="submit" disabled={updating}>
                      <Translate contentKey="entity.action.update">Update</Translate>
                    </Button>
                  )}
                </div>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  events: storeState.event.entities,
  transactionEntity: storeState.transaction.entity,
  loading: storeState.transaction.loading,
  updating: storeState.transaction.updating,
  updateSuccess: storeState.transaction.updateSuccess,
  userId: storeState.authentication.id,
});

const mapDispatchToProps = {
  getEvents,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionUpdate);
