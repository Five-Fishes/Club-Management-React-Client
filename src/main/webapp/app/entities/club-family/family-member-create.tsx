import React, { ReactNode } from 'react';

import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { getUsersWithoutFamily } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, createEntity, updateEntity, deleteEntity, reset } from 'app/entities/user-cc-info/user-cc-info.reducer';
import { IRootState } from 'app/shared/reducers';
import { IUser } from 'app/shared/model/user.model';
import { concatFullName } from 'app/shared/util/string-util';
import { IRedirectLocationState } from 'app/shared/auth/app-route';

export interface IFamilyMemberCreateProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{ id: string; familyCode: string }, any, IRedirectLocationState> {}

export interface IFamilyMemberState {
  isNew: boolean;
  hasFamilyCode: boolean;
}
export class FamilyMemberCreate extends React.Component<IFamilyMemberCreateProps, IFamilyMemberState> {
  constructor(props: IFamilyMemberCreateProps) {
    super(props);
    this.state = {
      isNew: !!this.props.match.params.familyCode && !this.props.match.params.id,
      hasFamilyCode: !!this.props.match.params.familyCode || !!this.props.match.params.id,
    };
    this.renderNames = this.renderNames.bind(this);
    this.setFamilyCode = this.setFamilyCode.bind(this);
  }

  componentWillUpdate(nextProps: IFamilyMemberCreateProps) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
      this.props.getUsersWithoutFamily();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  renderNames(users: readonly IUser[]): ReactNode {
    return users && users.length <= 0 ? (
      <option disabled>{translate('error.noUserFound')}</option>
    ) : (
      users.map((user: IUser) => {
        if (user) {
          return (
            <option key={user.id} value={user.id}>
              {concatFullName(user.firstName, user.lastName)}
            </option>
          );
        }
      })
    );
  }

  handleClose = () => {
    this.props.history.push(`${this.props.location.state?.from}` ?? '/entity/members/cc-family');
  };

  setFamilyCode(event: { target: HTMLInputElement }): void {
    if (event.target.value === '') {
      this.setState({
        hasFamilyCode: false,
      });
    } else {
      this.setState({
        hasFamilyCode: true,
      });
    }
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      if (values.familyRole === 'MEMBER') {
        values.familyRole = null;
      }
      const { userEntity } = this.props;
      const entity = {
        ...userEntity,
        ...values,
      };
      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        if (entity.clubFamilyCode === '') {
          this.props.deleteEntity(entity.id);
        } else {
          this.props.updateEntity(entity);
        }
      }
    }
  };

  render() {
    const { location, users, userEntity, loading } = this.props;
    const { familyCode } = this.props.match.params;
    const { isNew, hasFamilyCode } = this.state;
    return (
      <div className="mx-3">
        <Row className="justify-content-center">
          <Col md="8">
            <h2>
              <Translate contentKey="clubmanagementApp.clubFamily.member.createOrEditLabel">Add or edit a CC Family Member</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : userEntity} onSubmit={this.saveEntity}>
                <AvGroup>
                  <Label for="user-id">Name</Label>
                  <AvField id="user-id" type="select" className="form-control" name="userId" required={isNew} disabled={!isNew}>
                    <option value="" disabled hidden>
                      {translate('global.select.selectUser')}
                    </option>

                    {isNew ? (
                      this.renderNames(users)
                    ) : (
                      <option key={userEntity.id} value={userEntity.id}>
                        {concatFullName(userEntity?.user?.firstName, userEntity?.user?.lastName)}
                      </option>
                    )}
                  </AvField>
                </AvGroup>
                <AvGroup>
                  <Label id="familyLabel" for="club-family">
                    Family
                  </Label>
                  <AvField
                    id="club-family"
                    type="select"
                    name="clubFamilyCode"
                    value={familyCode ?? userEntity.clubFamilyCode}
                    disabled={isNew}
                    onChange={this.setFamilyCode}
                  >
                    {isNew ? null : <option value="">{translate('clubmanagementApp.clubFamily.none')}</option>}
                    <option value="JIN_LONG">{translate('clubmanagementApp.clubFamily.jinlong.name')}</option>
                    <option value="BI_MU">{translate('clubmanagementApp.clubFamily.bimu.name')}</option>
                    <option value="QI_CAI">{translate('clubmanagementApp.clubFamily.qicai.name')}</option>
                    <option value="KONG_QUE">{translate('clubmanagementApp.clubFamily.kongque.name')}</option>
                    <option value="XIAO_CHOU">{translate('clubmanagementApp.clubFamily.xiaochou.name')}</option>
                  </AvField>
                </AvGroup>
                {hasFamilyCode ? (
                  <AvGroup>
                    <Label id="roleLabel" for="club-member-role">
                      Role
                    </Label>
                    <AvInput id="club-member-role" type="select" name="familyRole" value={(!isNew && userEntity.familyRole) || 'MEMBER'}>
                      <option value={'MEMBER'}>{translate('clubmanagementApp.ClubFamilyRole.MEMBER')}</option>
                      <option value="FATHER">{translate('clubmanagementApp.ClubFamilyRole.FATHER')}</option>
                      <option value="MOTHER">{translate('clubmanagementApp.ClubFamilyRole.MOTHER')}</option>
                    </AvInput>
                  </AvGroup>
                ) : null}
                <div className="general-buttonContainer--flexContainer">
                  <Button
                    className="general-button--width"
                    tag={Link}
                    id="cancel-save"
                    to={location.state?.from ?? '/entity/members/cc-family'}
                    replace
                    color="cancel"
                  >
                    <Translate contentKey="entity.action.cancel">Cancel</Translate>
                  </Button>
                  &nbsp;
                  <Button className="general-button--width" color="action" id="save-entity" type="submit">
                    {isNew ? (
                      <Translate contentKey="entity.action.add">Add</Translate>
                    ) : (
                      <Translate contentKey="entity.action.update">Update</Translate>
                    )}
                  </Button>
                </div>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

// Reducer props
const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  loading: storeState.userCCInfo.loading,
  userEntity: storeState.userCCInfo.entity,
  updateSuccess: storeState.userCCInfo.updateSuccess,
});

// Reducer Action Creators
const mapDispatchToProps = {
  getEntity,
  getUsersWithoutFamily,
  createEntity,
  updateEntity,
  deleteEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FamilyMemberCreate);
