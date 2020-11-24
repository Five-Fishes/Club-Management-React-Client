import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './budget.reducer';
import { IBudget } from 'app/shared/model/budget.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBudgetProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Budget extends React.Component<IBudgetProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { budgetList, match } = this.props;
    return (
      <div>
        <h2 id="budget-heading">
          <Translate contentKey="clubmanagementApp.budget.home.title">Budgets</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="clubmanagementApp.budget.home.createLabel">Create new Budget</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {budgetList && budgetList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.budget.eventId">Event Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.budget.amount">Amount</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.budget.type">Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.budget.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.budget.details">Details</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {budgetList.map((budget, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${budget.id}`} color="link" size="sm">
                        {budget.id}
                      </Button>
                    </td>
                    <td>{budget.eventId}</td>
                    <td>{budget.amount}</td>
                    <td>
                      <Translate contentKey={`clubmanagementApp.TransactionType.${budget.type}`} />
                    </td>
                    <td>{budget.name}</td>
                    <td>{budget.details}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${budget.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${budget.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${budget.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="clubmanagementApp.budget.home.notFound">No Budgets found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ budget }: IRootState) => ({
  budgetList: budget.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Budget);
