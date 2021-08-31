import React from 'react';

import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';

import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';
import MemberCard from './member-card';

import { getUsersWithFamilyCode } from 'app/entities/user-cc-info/user-cc-info.reducer';

export interface IFamilyMemberProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

class FamilyMember extends React.Component<IFamilyMemberProps> {
  constructor(props: IFamilyMemberProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsersWithFamilyCode(this.props.match.params.id);
  }

  render() {
    const { users, match } = this.props;
    return (
      <div>
        <h2 id="event-activity-heading" className="event-module-heading">
          Bi Mu
        </h2>
        <div className="mx-4">
          <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.HEAD}>
            <Link className="btn btn-action jh-create-entity w-100 my-2" to={`/entity/members/club-family/${match.params.id}/new`}>
              <Translate contentKey="entity.action.add">Add</Translate>
            </Link>
          </AuthorizationChecker>
          {users.map(user => (
            <MemberCard userCCInfo={user}></MemberCard>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userCCInfo.entities,
});

const mapDispatchToProps = {
  getUsersWithFamilyCode,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FamilyMember);
