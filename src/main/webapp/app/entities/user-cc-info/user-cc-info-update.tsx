import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './user-cc-info.reducer';
import { IUserCCInfo } from 'app/shared/model/user-cc-info.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserCCInfoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUserCCInfoUpdateState {
  isNew: boolean;
}

export class UserCCInfoUpdate extends React.Component<IUserCCInfoUpdateProps, IUserCCInfoUpdateState> {
  constructor(props: IUserCCInfoUpdateProps) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
    };
  }

  componentWillUpdate(nextProps: IUserCCInfoUpdateProps, nextState: IUserCCInfoUpdateState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { userCCInfoEntity } = this.props;
      const entity = {
        ...userCCInfoEntity,
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
    this.props.history.push('/entity/user-cc-info');
  };

  render() {
    const { userCCInfoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.userCCInfo.home.createOrEditLabel">
              <Translate contentKey="clubmanagementApp.userCCInfo.home.createOrEditLabel">Create or edit a UserCCInfo</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : userCCInfoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="user-cc-info-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="user-cc-info-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="userIdLabel" for="user-cc-info-userId">
                    <Translate contentKey="clubmanagementApp.userCCInfo.userId">User Id</Translate>
                  </Label>
                  <AvField id="user-cc-info-userId" type="string" className="form-control" name="userId" />
                </AvGroup>
                <AvGroup>
                  <Label id="clubFamilyIdLabel" for="user-cc-info-clubFamilyId">
                    <Translate contentKey="clubmanagementApp.userCCInfo.clubFamilyId">Club Family Id</Translate>
                  </Label>
                  <AvField id="user-cc-info-clubFamilyId" type="string" className="form-control" name="clubFamilyId" />
                </AvGroup>
                <AvGroup>
                  <Label id="familyRoleLabel" for="user-cc-info-familyRole">
                    <Translate contentKey="clubmanagementApp.userCCInfo.familyRole">Family Role</Translate>
                  </Label>
                  <AvInput
                    id="user-cc-info-familyRole"
                    type="select"
                    className="form-control"
                    name="familyRole"
                    value={(!isNew && userCCInfoEntity.familyRole) || 'FATHER'}
                  >
                    <option value="FATHER">{translate('clubmanagementApp.ClubFamilyRole.FATHER')}</option>
                    <option value="MOTHER">{translate('clubmanagementApp.ClubFamilyRole.MOTHER')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="yearSessionLabel" for="user-cc-info-yearSession">
                    <Translate contentKey="clubmanagementApp.userCCInfo.yearSession">Year Session</Translate>
                  </Label>
                  <AvField id="user-cc-info-yearSession" type="text" name="yearSession" />
                </AvGroup>
                <AvGroup>
                  <Label id="clubFamilyNameLabel" for="user-cc-info-clubFamilyName">
                    <Translate contentKey="clubmanagementApp.userCCInfo.clubFamilyName">Club Family Name</Translate>
                  </Label>
                  <AvField id="user-cc-info-clubFamilyName" type="text" name="clubFamilyName" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/user-cc-info" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  userCCInfoEntity: storeState.userCCInfo.entity,
  loading: storeState.userCCInfo.loading,
  updating: storeState.userCCInfo.updating,
  updateSuccess: storeState.userCCInfo.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserCCInfoUpdate);
