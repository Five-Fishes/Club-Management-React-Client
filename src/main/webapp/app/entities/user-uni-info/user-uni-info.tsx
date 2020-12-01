import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './user-uni-info.reducer';
import { IUserUniInfo } from 'app/shared/model/user-uni-info.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserUniInfoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class UserUniInfo extends React.Component<IUserUniInfoProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { userUniInfoList, match } = this.props;
    return (
      <div>
        <h2 id="user-uni-info-heading">
          <Translate contentKey="clubmanagementApp.userUniInfo.home.title">User Uni Infos</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="clubmanagementApp.userUniInfo.home.createLabel">Create new User Uni Info</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {userUniInfoList && userUniInfoList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.userUniInfo.userId">User Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.userUniInfo.faculty">Faculty</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.userUniInfo.program">Program</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.userUniInfo.yearSession">Year Session</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.userUniInfo.intakeSemester">Intake Semester</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.userUniInfo.yearOfStudy">Year Of Study</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.userUniInfo.stayIn">Stay In</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.userUniInfo.status">Status</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {userUniInfoList.map((userUniInfo, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${userUniInfo.id}`} color="link" size="sm">
                        {userUniInfo.id}
                      </Button>
                    </td>
                    <td>{userUniInfo.userId}</td>
                    <td>{userUniInfo.faculty}</td>
                    <td>{userUniInfo.program}</td>
                    <td>{userUniInfo.yearSession}</td>
                    <td>{userUniInfo.intakeSemester}</td>
                    <td>{userUniInfo.yearOfStudy}</td>
                    <td>{userUniInfo.stayIn}</td>
                    <td>
                      <Translate contentKey={`clubmanagementApp.UserUniStatus.${userUniInfo.status}`} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${userUniInfo.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${userUniInfo.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${userUniInfo.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="clubmanagementApp.userUniInfo.home.notFound">No User Uni Infos found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userUniInfo }: IRootState) => ({
  userUniInfoList: userUniInfo.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserUniInfo);
