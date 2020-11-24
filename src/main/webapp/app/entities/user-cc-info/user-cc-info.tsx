import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './user-cc-info.reducer';
import { IUserCCInfo } from 'app/shared/model/user-cc-info.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserCCInfoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class UserCCInfo extends React.Component<IUserCCInfoProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { userCCInfoList, match } = this.props;
    return (
      <div>
        <h2 id="user-cc-info-heading">
          <Translate contentKey="clubmanagementApp.userCCInfo.home.title">User CC Infos</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="clubmanagementApp.userCCInfo.home.createLabel">Create new User CC Info</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {userCCInfoList && userCCInfoList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.userCCInfo.userId">User Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.userCCInfo.clubFamilyId">Club Family Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.userCCInfo.familyRole">Family Role</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.userCCInfo.yearSession">Year Session</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.userCCInfo.clubFamilyName">Club Family Name</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {userCCInfoList.map((userCCInfo, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${userCCInfo.id}`} color="link" size="sm">
                        {userCCInfo.id}
                      </Button>
                    </td>
                    <td>{userCCInfo.userId}</td>
                    <td>{userCCInfo.clubFamilyId}</td>
                    <td>
                      <Translate contentKey={`clubmanagementApp.ClubFamilyRole.${userCCInfo.familyRole}`} />
                    </td>
                    <td>{userCCInfo.yearSession}</td>
                    <td>{userCCInfo.clubFamilyName}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${userCCInfo.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${userCCInfo.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${userCCInfo.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="clubmanagementApp.userCCInfo.home.notFound">No User CC Infos found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userCCInfo }: IRootState) => ({
  userCCInfoList: userCCInfo.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCCInfo);
