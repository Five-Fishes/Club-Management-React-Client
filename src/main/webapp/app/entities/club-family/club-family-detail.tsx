import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './club-family.reducer';
import { IClubFamily } from 'app/shared/model/club-family.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClubFamilyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ClubFamilyDetail extends React.Component<IClubFamilyDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { clubFamilyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="clubmanagementApp.clubFamily.detail.title">ClubFamily</Translate> [<b>{clubFamilyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="clubmanagementApp.clubFamily.name">Name</Translate>
              </span>
            </dt>
            <dd>{clubFamilyEntity.name}</dd>
            <dt>
              <span id="slogan">
                <Translate contentKey="clubmanagementApp.clubFamily.slogan">Slogan</Translate>
              </span>
            </dt>
            <dd>{clubFamilyEntity.slogan}</dd>
          </dl>
          <Button tag={Link} to="/entity/members/club-family" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/members/club-family/${clubFamilyEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ clubFamily }: IRootState) => ({
  clubFamilyEntity: clubFamily.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClubFamilyDetail);
