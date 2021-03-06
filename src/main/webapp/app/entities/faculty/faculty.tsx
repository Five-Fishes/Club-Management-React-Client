import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './faculty.reducer';
import { IFaculty } from 'app/shared/model/faculty.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFacultyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Faculty extends React.Component<IFacultyProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { facultyList, match } = this.props;
    return (
      <div>
        <h2 id="faculty-heading">
          <Translate contentKey="clubmanagementApp.faculty.home.title">Faculties</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="clubmanagementApp.faculty.home.createLabel">Create new Faculty</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {facultyList && facultyList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.faculty.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.faculty.shortName">Short Name</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {facultyList.map((faculty, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${faculty.id}`} color="link" size="sm">
                        {faculty.id}
                      </Button>
                    </td>
                    <td>{faculty.name}</td>
                    <td>{faculty.shortName}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${faculty.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${faculty.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${faculty.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="clubmanagementApp.faculty.home.notFound">No Faculties found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ faculty }: IRootState) => ({
  facultyList: faculty.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Faculty);
