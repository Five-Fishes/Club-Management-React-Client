import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import '../../styles/event-module.scss';

import { createEntity, reset } from './budget.reducer';

export interface IBudgetCreateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string; eventId: string }> {}

export class EventBudgetCreate extends React.Component<IBudgetCreateProps> {
  constructor(props: IBudgetCreateProps) {
    super(props);
  }

  componentWillUpdate(nextProps: IBudgetCreateProps) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    this.props.reset();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { budgetEntity } = this.props;
      const entity = {
        ...budgetEntity,
        ...values,
      };

      this.props.createEntity(entity);
    }
  };

  handleClose = () => {
    this.props.history.push(`/entity/event-budget/event/${this.props.match.params.eventId}`);
  };

  render() {
    const { loading, updating, errResponse } = this.props;
    const { eventId } = this.props.match.params;

    return (
      <div className="mx-3">
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.eventBudget.home.createLabel" className="event-module-form-heading">
              <Translate contentKey="clubmanagementApp.eventBudget.home.createLabel">Create Event Budget</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={{}} onSubmit={this.saveEntity}>
                <AvField hidden id="budget-eventId" type="string" className="form-control" name="eventId" value={eventId} />

                <AvGroup>
                  <Label id="amountLabel" for="budget-amount">
                    <Translate contentKey="clubmanagementApp.eventBudget.amount">Amount</Translate>
                  </Label>
                  <AvField
                    id="budget-amount"
                    type="number"
                    name="amount"
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
                    required
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
                  <AvInput id="budget-type" type="select" className="form-control" name="type">
                    <option value="" selected disabled>
                      {translate('global.select.selectOne')}
                    </option>
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
                  />
                </AvGroup>
                <span className="text-error">{errResponse ? errResponse.response?.data?.detail : ''}</span>
                <div className="general-buttonContainer--flexContainer">
                  <Button
                    className="general-button--width"
                    tag={Link}
                    id="cancel-save"
                    to={`/entity/event-budget/event/${eventId}`}
                    replace
                    color="cancel"
                  >
                    <Translate contentKey="entity.action.cancel">Cancel</Translate>
                  </Button>
                  &nbsp;
                  <Button className="general-button--width" color="action" id="save-entity" type="submit" disabled={updating}>
                    <Translate contentKey="entity.action.create">Create</Translate>
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
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventBudgetCreate);
