import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './club-family.reducer';
import { IClubFamily } from 'app/shared/model/club-family.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClubFamilyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ClubFamily extends React.Component<IClubFamilyProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { clubFamilyList, match } = this.props;
    return (
      <div>
        <h2 id="club-family-heading">
          <Translate contentKey="clubmanagementApp.clubFamily.home.title">Club Families</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="clubmanagementApp.clubFamily.home.createLabel">Create new Club Family</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {clubFamilyList && clubFamilyList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.clubFamily.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="clubmanagementApp.clubFamily.slogan">Slogan</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {clubFamilyList.map((clubFamily, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${clubFamily.id}`} color="link" size="sm">
                        {clubFamily.id}
                      </Button>
                    </td>
                    <td>{clubFamily.name}</td>
                    <td>{clubFamily.slogan}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${clubFamily.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${clubFamily.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${clubFamily.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="clubmanagementApp.clubFamily.home.notFound">No Club Families found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ clubFamily }: IRootState) => ({
  clubFamilyList: clubFamily.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClubFamily);
