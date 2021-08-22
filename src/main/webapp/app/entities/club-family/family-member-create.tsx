import React, { ReactNode } from 'react';

import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { getUsersWithoutFamily } from 'app/modules/administration/user-management/user-management.reducer';
import { createEntity } from 'app/entities/user-cc-info/user-cc-info.reducer';
import { IRootState } from 'app/shared/reducers';
import { IUser } from 'app/shared/model/user.model';
import { concatFullName } from 'app/shared/util/string-util';

export interface IFamilyMemberCreateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

class FamilyMemberCreate extends React.Component<IFamilyMemberCreateProps> {
  constructor(props: IFamilyMemberCreateProps) {
    super(props);
  }

  componentWillUpdate(nextProps: IFamilyMemberCreateProps) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  handleClose = () => {
    this.props.history.push(`/entity/members/club-family/${this.props.match.params.id}`);
  };

  componentDidMount() {
    this.props.getUsersWithoutFamily();
  }

  renderNames(users: readonly IUser[]): ReactNode {
    return users.map((user: IUser) => {
      if (user) {
        return (
          <option key={user.id} value={user.id}>
            {concatFullName(user.firstName, user.lastName)}
          </option>
        );
      }
    });
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

      this.props.createEntity(entity);
    }
  };

  render() {
    const { users } = this.props;
    const { id: familyCode } = this.props.match.params;
    return (
      <div className="mx-3">
        <Row className="justify-content-center">
          <Col md="8">
            <h2>
              <Translate contentKey="clubmanagementApp.clubFamily.member.createLabel">Add Family Member</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            <AvForm model={{}} onSubmit={this.saveEntity}>
              <AvGroup>
                <Label for="memberLabel">Name</Label>
                <AvField id="member-name" type="select" className="form-control" name="userId" required>
                  <option value="" disabled hidden>
                    {translate('global.select.selectUser')}
                  </option>
                  {this.renderNames(users)}
                </AvField>
              </AvGroup>
              <AvGroup>
                <Label id="familyLabel" for="club-family">
                  Family
                </Label>
                <AvField id="club-family" type="select" name="clubFamilyCode" value={familyCode} disabled>
                  <option value="JIN_LONG">{translate('clubmanagementApp.clubFamily.jinlong.name')}</option>
                  <option value="BI_MU">{translate('clubmanagementApp.clubFamily.bimu.name')}</option>
                  <option value="QI_CAI">{translate('clubmanagementApp.clubFamily.qicai.name')}</option>
                  <option value="KONG_QUE">{translate('clubmanagementApp.clubFamily.kongque.name')}</option>
                  <option value="XIAO_CHOU">{translate('clubmanagementApp.clubFamily.xiaochou.name')}</option>
                </AvField>
              </AvGroup>
              <AvGroup>
                <Label id="roleLabel" for="club-member-role">
                  Role
                </Label>
                <AvInput id="club-member-role" type="select" name="familyRole" value={'MEMBER'}>
                  <option value={'MEMBER'}>{translate('clubmanagementApp.ClubFamilyRole.MEMBER')}</option>
                  <option value="FATHER">{translate('clubmanagementApp.ClubFamilyRole.FATHER')}</option>
                  <option value="MOTHER">{translate('clubmanagementApp.ClubFamilyRole.MOTHER')}</option>
                </AvInput>
              </AvGroup>
              <div className="general-buttonContainer--flexContainer">
                <Button
                  className="general-button--width"
                  tag={Link}
                  id="cancel-save"
                  to={`/entity/members/club-family/${familyCode}`}
                  replace
                  color="cancel"
                >
                  <Translate contentKey="entity.action.cancel">Cancel</Translate>
                </Button>
                &nbsp;
                <Button className="general-button--width" color="action" id="save-entity" type="submit">
                  <Translate contentKey="entity.action.add">Add</Translate>
                </Button>
              </div>
            </AvForm>
          </Col>
        </Row>
      </div>
    );
  }
}

// Reducer props
const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  userEntity: storeState.userCCInfo.entity,
  updateSuccess: storeState.userCCInfo.updateSuccess,
});

// Reducer Action Creators
const mapDispatchToProps = {
  getUsersWithoutFamily,

  createEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FamilyMemberCreate);
