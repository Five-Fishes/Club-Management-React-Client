import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './administrator.reducer';
import { IAdministrator } from 'app/shared/model/administrator.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAdministratorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAdministratorUpdateState {
  isNew: boolean;
}

export class AdministratorUpdate extends React.Component<IAdministratorUpdateProps, IAdministratorUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
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

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { administratorEntity } = this.props;
      const entity = {
        ...administratorEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/administrator');
  };

  render() {
    const { administratorEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.administrator.home.createOrEditLabel">
              <Translate contentKey="clubmanagementApp.administrator.home.createOrEditLabel">Create or edit a Administrator</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : administratorEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="administrator-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="administrator-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="userIdLabel" for="administrator-userId">
                    <Translate contentKey="clubmanagementApp.administrator.userId">User Id</Translate>
                  </Label>
                  <AvField id="administrator-userId" type="string" className="form-control" name="userId" />
                </AvGroup>
                <AvGroup>
                  <Label id="yearSessionLabel" for="administrator-yearSession">
                    <Translate contentKey="clubmanagementApp.administrator.yearSession">Year Session</Translate>
                  </Label>
                  <AvField id="administrator-yearSession" type="text" name="yearSession" />
                </AvGroup>
                <AvGroup>
                  <Label id="roleLabel" for="administrator-role">
                    <Translate contentKey="clubmanagementApp.administrator.role">Role</Translate>
                  </Label>
                  <AvInput
                    id="administrator-role"
                    type="select"
                    className="form-control"
                    name="role"
                    value={(!isNew && administratorEntity.role) || 'CC_HEAD'}
                  >
                    <option value="CC_HEAD">{translate('clubmanagementApp.AdministratorRole.CC_HEAD')}</option>
                    <option value="VICE_CC_HEAD">{translate('clubmanagementApp.AdministratorRole.VICE_CC_HEAD')}</option>
                    <option value="SECRETARY">{translate('clubmanagementApp.AdministratorRole.SECRETARY')}</option>
                    <option value="TEASURER">{translate('clubmanagementApp.AdministratorRole.TEASURER')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="administrator-status">
                    <Translate contentKey="clubmanagementApp.administrator.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="administrator-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && administratorEntity.status) || 'ACTIVE'}
                  >
                    <option value="ACTIVE">{translate('clubmanagementApp.AdministratorStatus.ACTIVE')}</option>
                    <option value="DEACTIVATE">{translate('clubmanagementApp.AdministratorStatus.DEACTIVATE')}</option>
                    <option value="PENDING">{translate('clubmanagementApp.AdministratorStatus.PENDING')}</option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/administrator" replace color="info">
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
  administratorEntity: storeState.administrator.entity,
  loading: storeState.administrator.loading,
  updating: storeState.administrator.updating,
  updateSuccess: storeState.administrator.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdministratorUpdate);
