import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './user-uni-info.reducer';
import { IUserUniInfo } from 'app/shared/model/user-uni-info.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserUniInfoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUserUniInfoUpdateState {
  isNew: boolean;
}

export class UserUniInfoUpdate extends React.Component<IUserUniInfoUpdateProps, IUserUniInfoUpdateState> {
  constructor(props: IUserUniInfoUpdateProps) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
    };
  }

  componentWillUpdate(nextProps: IUserUniInfoUpdateProps, nextState: IUserUniInfoUpdateState) {
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
      const { userUniInfoEntity } = this.props;
      const entity = {
        ...userUniInfoEntity,
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
    this.props.history.push('/entity/user-uni-info');
  };

  render() {
    const { userUniInfoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.userUniInfo.home.createOrEditLabel">
              <Translate contentKey="clubmanagementApp.userUniInfo.home.createOrEditLabel">Create or edit a UserUniInfo</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : userUniInfoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="user-uni-info-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="user-uni-info-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="userIdLabel" for="user-uni-info-userId">
                    <Translate contentKey="clubmanagementApp.userUniInfo.userId">User Id</Translate>
                  </Label>
                  <AvField id="user-uni-info-userId" type="string" className="form-control" name="userId" />
                </AvGroup>
                <AvGroup>
                  <Label id="facultyLabel" for="user-uni-info-faculty">
                    <Translate contentKey="clubmanagementApp.userUniInfo.faculty">Faculty</Translate>
                  </Label>
                  <AvField id="user-uni-info-faculty" type="text" name="faculty" />
                </AvGroup>
                <AvGroup>
                  <Label id="programLabel" for="user-uni-info-program">
                    <Translate contentKey="clubmanagementApp.userUniInfo.program">Program</Translate>
                  </Label>
                  <AvField id="user-uni-info-program" type="text" name="program" />
                </AvGroup>
                <AvGroup>
                  <Label id="yearSessionLabel" for="user-uni-info-yearSession">
                    <Translate contentKey="clubmanagementApp.userUniInfo.yearSession">Year Session</Translate>
                  </Label>
                  <AvField id="user-uni-info-yearSession" type="text" name="yearSession" />
                </AvGroup>
                <AvGroup>
                  <Label id="intakeSemesterLabel" for="user-uni-info-intakeSemester">
                    <Translate contentKey="clubmanagementApp.userUniInfo.intakeSemester">Intake Semester</Translate>
                  </Label>
                  <AvField id="user-uni-info-intakeSemester" type="string" className="form-control" name="intakeSemester" />
                </AvGroup>
                <AvGroup>
                  <Label id="yearOfStudyLabel" for="user-uni-info-yearOfStudy">
                    <Translate contentKey="clubmanagementApp.userUniInfo.yearOfStudy">Year Of Study</Translate>
                  </Label>
                  <AvField id="user-uni-info-yearOfStudy" type="text" name="yearOfStudy" />
                </AvGroup>
                <AvGroup>
                  <Label id="stayInLabel" for="user-uni-info-stayIn">
                    <Translate contentKey="clubmanagementApp.userUniInfo.stayIn">Stay In</Translate>
                  </Label>
                  <AvField id="user-uni-info-stayIn" type="text" name="stayIn" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="user-uni-info-status">
                    <Translate contentKey="clubmanagementApp.userUniInfo.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="user-uni-info-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && userUniInfoEntity.status) || 'GRADUATED'}
                  >
                    <option value="GRADUATED">{translate('clubmanagementApp.UserUniStatus.GRADUATED')}</option>
                    <option value="STUDYING">{translate('clubmanagementApp.UserUniStatus.STUDYING')}</option>
                    <option value="EXTENDED">{translate('clubmanagementApp.UserUniStatus.EXTENDED')}</option>
                    <option value="TRANSFERRED">{translate('clubmanagementApp.UserUniStatus.TRANSFERRED')}</option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/user-uni-info" replace color="info">
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
  userUniInfoEntity: storeState.userUniInfo.entity,
  loading: storeState.userUniInfo.loading,
  updating: storeState.userUniInfo.updating,
  updateSuccess: storeState.userUniInfo.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserUniInfoUpdate);
