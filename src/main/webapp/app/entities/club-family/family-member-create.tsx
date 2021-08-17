import React, { ReactNode } from 'react';

import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { getUsersWithoutFamily } from 'app/modules/administration/user-management/user-management.reducer';
import { createEntity } from 'app/entities/user-cc-info/user-cc-info.reducer';
import { IRootState } from 'app/shared/reducers';
import { IUser } from 'app/shared/model/user.model';

export interface IFamilyMemberCreateProps extends StateProps, DispatchProps, RouteComponentProps {}

class FamilyMemberCreate extends React.Component<IFamilyMemberCreateProps> {
  componentDidMount() {
    this.props.getUsersWithoutFamily();
  }

  renderNames(users: readonly IUser[]): ReactNode {
    return users.map((user: IUser) => {
      if (user) {
        return <option key={user.id} value={user.id}>{`${user.firstName ?? ''} ${user.lastName ?? ''}`}</option>;
      }
    });
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
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
    return (
      <div className="mx-3">
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.clubFamily.home.createOrEditLabel">Add Family Member</h2>
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
                <AvField id="club-family" type="select" name="clubFamilyCode" value="JIN_LONG">
                  <option value="JIN_LONG">Jin Long</option>
                  <option value="BI_MU">Bi Mu</option>
                  <option value="QI_CAI">Qi Cai</option>
                  <option value="KONG_QUE">Peacock</option>
                  <option value="XIAO_CHOU">Nemo</option>
                </AvField>
              </AvGroup>
              <AvGroup>
                <Label id="roleLabel" for="club-member-role">
                  Role
                </Label>
                <AvInput id="club-member-role" type="select" name="familyRole" value={null}>
                  <option value={null}>Member</option>
                  <option value="FATHER">Father</option>
                  <option value="MOTHER">Mother</option>
                </AvInput>
              </AvGroup>
              <div className="general-buttonContainer--flexContainer">
                <Button className="general-button--width" tag={Link} id="cancel-save" to="/entity/event" replace color="cancel">
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
});

// Reducer Action Creators
const mapDispatchToProps = {
  getUsersWithoutFamily,
  createEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FamilyMemberCreate);
