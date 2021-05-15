import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './budget.reducer';
import { IBudget } from 'app/shared/model/budget.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import budget from './budget';
import '../../styles/event-module.scss';

export interface IBudgetUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string; eventId: string }> {}

export interface IBudgetUpdateState {
  isNew: boolean;
}

export class BudgetUpdate extends React.Component<IBudgetUpdateProps, IBudgetUpdateState> {
  constructor(props: IBudgetUpdateProps) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
    };
  }

  componentWillUpdate(nextProps: IBudgetUpdateProps, nextState: IBudgetUpdateState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id, this.props.match.params.eventId);
    }
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { budgetEntity } = this.props;
      const entity = {
        ...budgetEntity,
        ...values,
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push(`/entity/event-budget/event/${this.props.match.params.eventId}`);
  };

  render() {
    const { budgetEntity, loading, updating, errResponse } = this.props;
    const { isNew } = this.state;

    const { details } = budgetEntity;

    return (
      <div className="mx-3">
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.eventBudget.home.editLabel" className="event-module-form-heading">
              <Translate contentKey="clubmanagementApp.eventBudget.home.editLabel">Edit Event Budget</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : budgetEntity} onSubmit={this.saveEntity}>
                <AvGroup>
                  <Label id="amountLabel" for="budget-amount">
                    <Translate contentKey="clubmanagementApp.eventBudget.amount">Amount</Translate>
                  </Label>
                  <AvField
                    id="budget-amount"
                    type="text"
                    name="amount"
                    value={budgetEntity.amount}
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
                  <Label id="nameLabel" for="budget-name">
                    <Translate contentKey="clubmanagementApp.eventBudget.name">Name</Translate>
                  </Label>
                  <AvField
                    id="budget-name"
                    type="text"
                    name="name"
                    value={budgetEntity.name}
                    validate={{
                      required: { value: true, errorMessage: 'Please enter a name for this budget' },
                      maxLength: { value: 100, errorMessage: 'Name cannot be more than 100 characters' },
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="budget-type">
                    <Translate contentKey="clubmanagementApp.eventBudget.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="budget-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && budgetEntity.type) || 'INCOME'}
                  >
                    <option value="INCOME">{translate('clubmanagementApp.TransactionType.INCOME')}</option>
                    <option value="EXPENSE">{translate('clubmanagementApp.TransactionType.EXPENSE')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="detailsLabel" for="budget-details">
                    <Translate contentKey="clubmanagementApp.eventBudget.details">Details</Translate>
                  </Label>
                  <AvInput
                    id="budget-details"
                    type="textarea"
                    name="details"
                    validate={{
                      maxLength: { value: 200, errorMessage: 'Details cannot be more than 200 characters' },
                    }}
                  >
                    {budgetEntity.details}
                  </AvInput>
                </AvGroup>
                <div className="text-danger">{errResponse ? errResponse.response?.data?.detail : ''}</div>
                <div className="general-buttonContainer--flexContainer">
                  <Button
                    className="general-button--width"
                    tag={Link}
                    id="cancel-save"
                    to={`/entity/event-budget/event/${budgetEntity.eventId}`}
                    replace
                    color="cancel"
                  >
                    <Translate contentKey="entity.action.cancel">Cancel</Translate>
                  </Button>
                  &nbsp;
                  <Button className="general-button--width" color="action" id="save-entity" type="submit" disabled={updating}>
                    <Translate contentKey="entity.action.update">Update</Translate>
                  </Button>
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
  budgetEntity: storeState.budget.entity,
  loading: storeState.budget.loading,
  updating: storeState.budget.updating,
  updateSuccess: storeState.budget.updateSuccess,
  errResponse: storeState.budget.errResponse,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BudgetUpdate);
