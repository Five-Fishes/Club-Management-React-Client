import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Container, Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities, getEntity, updateEntity, createEntity, reset, getYearSessionOptions } from './administrator.reducer';
// tslint:disable-next-line:no-unused-variable
import { IUser } from 'app/shared/model/user.model';
import axios from 'axios';
import { AdministratorStatus } from 'app/shared/model/administrator.model';
import { concatFullName } from 'app/shared/util/string-util';
import { AvSelectField } from '@availity/reactstrap-validation-select';

export interface IAdministratorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAdministratorUpdateState {
  isNew: boolean;
  allUsers: ReadonlyArray<IUser>;
}

export class AdministratorUpdate extends React.Component<IAdministratorUpdateProps, IAdministratorUpdateState> {
  constructor(props: IAdministratorUpdateProps) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
      allUsers: [],
    };
  }

  getAllNonAdministratorUsers = async () => {
    const users = await axios.get<IUser[]>(`/api/users`);
    this.setState({ allUsers: users.data });
  };

  componentWillUpdate(nextProps: IAdministratorUpdateProps, nextState: IAdministratorUpdateState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    this.props.getYearSessionOptions(0, 1, 'value,desc');
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
    this.getAllNonAdministratorUsers();
    this.props.getEntities('', AdministratorStatus.ACTIVE);
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { administratorEntity, yearSessionOptions } = this.props;
      const { isNew } = this.state;
      const entity = {
        ...administratorEntity,
        ...values,
        ...(isNew && { yearSession: yearSessionOptions[0] }),
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/members/administrator');
  };

  render() {
    const { administratorList, administratorEntity, loading, updating } = this.props;
    const { isNew, allUsers } = this.state;
    let options = [];
    let toFilter = administratorList;
    if (!isNew && administratorEntity) {
      toFilter = toFilter.filter(admin => admin.id !== administratorEntity.id);
    }
    options = allUsers?.filter(user => toFilter?.every(admin => admin.userId !== user.id));
    const selectOptions = options.map(option => ({
      value: option.id,
      label: concatFullName(option.firstName ?? '', option.lastName ?? ''),
    }));

    return (
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            {isNew ? (
              <h2 id="clubmanagementApp.administrator.home.createLabel">
                <Translate contentKey="clubmanagementApp.administrator.home.createLabel">Create new Administrator</Translate>
              </h2>
            ) : (
              <h2 id="clubmanagementApp.administrator.home.editLabel">
                <Translate contentKey="clubmanagementApp.administrator.home.editLabel">Edit Administrator</Translate>
              </h2>
            )}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : administratorEntity} onSubmit={this.saveEntity}>
                <AvGroup>
                  <Label for="user-id">
                    <Translate contentKey="global.form.username.label">User Name</Translate>
                  </Label>
                  {isNew ? (
                    <AvSelectField
                      id="user-id"
                      name="userId"
                      options={selectOptions}
                      validate={{
                        required: { value: true, errorMessage: 'Please select user name' },
                      }}
                    />
                  ) : (
                    <AvInput
                      id="administrator-role"
                      type="select"
                      className="form-control"
                      name="role"
                      value={administratorEntity.userId}
                      required
                      disabled
                    >
                      {selectOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </AvInput>
                  )}
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
                    required
                  >
                    <option value="CC_HEAD">{translate('clubmanagementApp.AdministratorRole.CC_HEAD')}</option>
                    <option value="VICE_CC_HEAD">{translate('clubmanagementApp.AdministratorRole.VICE_CC_HEAD')}</option>
                    <option value="SECRETARY">{translate('clubmanagementApp.AdministratorRole.SECRETARY')}</option>
                    <option value="TEASURER">{translate('clubmanagementApp.AdministratorRole.TEASURER')}</option>
                  </AvInput>
                </AvGroup>
                {/* <AvGroup>
                  <Label id="yearSessionLabel" for="administrator-yearSession">
                    <Translate contentKey="clubmanagementApp.administrator.yearSession">Year Session</Translate>
                  </Label>
                  <AvInput
                    id="administrator-yearSession"
                    type="select"
                    className="form-control"
                    name="role"
                    value={(!isNew && administratorEntity.yearSession) || 'CC_HEAD'}
                    required
                  >
                    {
                      yearSessionOptions.map(year => <option key={year} value={year}>{year}</option>)
                    }
                  </AvInput>
                </AvGroup> */}
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
                  </AvInput>
                </AvGroup>
                <div className="general-buttonContainer--flexContainer">
                  <Button
                    className="general-button--width"
                    tag={Link}
                    id="cancel-save"
                    to="/entity/members/administrator"
                    replace
                    color="cancel"
                  >
                    <Translate contentKey="entity.action.cancel">Cancel</Translate>
                  </Button>
                  {isNew ? (
                    <Button className="general-button--width" color="action" id="save-entity" type="submit" disabled={updating}>
                      <Translate contentKey="entity.action.create">Create</Translate>
                    </Button>
                  ) : (
                    <Button className="general-button--width" color="action" id="save-entity" type="submit" disabled={updating}>
                      <Translate contentKey="entity.action.update">Update</Translate>
                    </Button>
                  )}
                </div>
              </AvForm>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ administrator }: IRootState) => ({
  administratorList: administrator.entities,
  administratorEntity: administrator.entity,
  loading: administrator.loading,
  updating: administrator.updating,
  updateSuccess: administrator.updateSuccess,
  yearSessionOptions: administrator.yearSessionOptions,
});

const mapDispatchToProps = {
  getEntities,
  getEntity,
  updateEntity,
  createEntity,
  getYearSessionOptions,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdministratorUpdate);
