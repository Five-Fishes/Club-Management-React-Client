import React from 'react';

import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, InputGroupAddon, InputGroup, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';

import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import EventRole from 'app/shared/model/enum/event-role.enum';
import MemberCard from './member-card';
import FilterSearchBar from 'app/shared/components/filterSearchBar/filterSearchBar';
import './family-member.scss';

import {
  getUsersWithFamilyCode,
  setSelectedYearSessionFilter,
  getYearSessionOptions,
  getEntities,
} from 'app/entities/user-cc-info/user-cc-info.reducer';
import { getClubFamilyDetails } from 'app/shared/services/club-family-info.service';

export interface IFamilyMemberProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFamilyMemberState {
  searchedName: string;
}
class FamilyMember extends React.Component<IFamilyMemberProps, IFamilyMemberState> {
  constructor(props: IFamilyMemberProps) {
    super(props);
    this.state = {
      searchedName: '',
    };
  }

  async componentDidMount() {
    await this.props.getYearSessionOptions(0, 12, 'value,desc');
    this.props.getUsersWithFamilyCode(this.props.match.params.id, this.props.selectedYearSessionFilter);
  }

  setYearSession = async (yearSession: string): Promise<void> => {
    await this.props.setSelectedYearSessionFilter(yearSession);
    this.props.getUsersWithFamilyCode(this.props.match.params.id, this.props.selectedYearSessionFilter);
  };

  render() {
    const { users, yearSessionOptions, selectedYearSessionFilter, match } = this.props;
    const familyName = getClubFamilyDetails(match.params.id).name;
    return (
      <div>
        <h2 id="event-activity-heading" className="event-module-heading">
          {familyName ? translate(familyName) : null}
        </h2>
        <div className="mx-4">
          <AuthorizationChecker ccRole={CCRole.ADMIN} eventRole={EventRole.HEAD}>
            <Link className="btn btn-action jh-create-entity w-100 my-2" to={`/entity/members/cc-family/${match.params.id}/new`}>
              <Translate contentKey="entity.action.add">Add</Translate>
            </Link>
          </AuthorizationChecker>
          {/* <FilterSearchBar></FilterSearchBar> */}
          <InputGroup>
            <InputGroupAddon className="search-bar-prepend" addonType="prepend" color="white">
              🔎
            </InputGroupAddon>
            <Input placeholder="Type a name to filter" className="search-bar-input" onKeyPress={this.inputOnChange} />
            <InputGroupAddon addonType="append">
              <Button className="search-bar-append">
                <FontAwesomeIcon icon="filter" color="#07ADE1" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {users && users.length > 0 ? (
            <div>
              {users.map(user => (
                <MemberCard key={user.id} userCCInfo={user} />
              ))}
            </div>
          ) : (
            <div className="alert alert-warning my-3">
              <Translate contentKey="clubmanagementApp.clubFamily.member.notFound">No Event Activities found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userCCInfo }: IRootState) => ({
  users: userCCInfo.entities,
  selectedYearSessionFilter: userCCInfo.selectedYearSessionFilter,
  yearSessionOptions: userCCInfo.yearSessionOptions,
});

const mapDispatchToProps = {
  getUsersWithFamilyCode,
  setSelectedYearSessionFilter,
  getYearSessionOptions,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FamilyMember);
