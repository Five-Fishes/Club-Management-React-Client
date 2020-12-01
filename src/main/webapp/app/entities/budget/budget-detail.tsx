import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './budget.reducer';
import { IBudget } from 'app/shared/model/budget.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBudgetDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BudgetDetail extends React.Component<IBudgetDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { budgetEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="clubmanagementApp.budget.detail.title">Budget</Translate> [<b>{budgetEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="eventId">
                <Translate contentKey="clubmanagementApp.budget.eventId">Event Id</Translate>
              </span>
            </dt>
            <dd>{budgetEntity.eventId}</dd>
            <dt>
              <span id="amount">
                <Translate contentKey="clubmanagementApp.budget.amount">Amount</Translate>
              </span>
            </dt>
            <dd>{budgetEntity.amount}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="clubmanagementApp.budget.type">Type</Translate>
              </span>
            </dt>
            <dd>{budgetEntity.type}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="clubmanagementApp.budget.name">Name</Translate>
              </span>
            </dt>
            <dd>{budgetEntity.name}</dd>
            <dt>
              <span id="details">
                <Translate contentKey="clubmanagementApp.budget.details">Details</Translate>
              </span>
            </dt>
            <dd>{budgetEntity.details}</dd>
          </dl>
          <Button tag={Link} to="/entity/budget" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/budget/${budgetEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ budget }: IRootState) => ({
  budgetEntity: budget.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetDetail);
