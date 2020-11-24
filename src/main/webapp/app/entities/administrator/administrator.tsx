import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './administrator.reducer';
import { IAdministrator } from 'app/shared/model/administrator.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAdministratorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Administrator extends React.Component<IAdministratorProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { administratorList, match } = this.props;
    return (
      <div>
        <h2 id="administrator-heading">
          <Translate contentKey="clubmanagementApp.administrator.home.title">Administrators</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="clubmanagementApp.administrator.home.createLabel">Create new Administrator</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {administratorList && administratorList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.administrator.userId">User Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.administrator.yearSession">Year Session</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.administrator.role">Role</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.administrator.status">Status</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {administratorList.map((administrator, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${administrator.id}`} color="link" size="sm">
                        {administrator.id}
                      </Button>
                    </td>
                    <td>{administrator.userId}</td>
                    <td>{administrator.yearSession}</td>
                    <td>
                      <Translate contentKey={`clubmanagementApp.AdministratorRole.${administrator.role}`} />
                    </td>
                    <td>
                      <Translate contentKey={`clubmanagementApp.AdministratorStatus.${administrator.status}`} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${administrator.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${administrator.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${administrator.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="clubmanagementApp.administrator.home.notFound">No Administrators found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ administrator }: IRootState) => ({
  administratorList: administrator.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Administrator);
