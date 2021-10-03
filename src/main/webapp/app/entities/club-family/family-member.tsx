import './family-member.scss';
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
import FilterSearchBar from 'app/shared/components/advancedSearchModal/advancedSearchModal';
import EventModal from 'app/shared/components/eventModal/event-modal';

import { getUsersWithFilter, reset as resetUsers } from 'app/entities/user-cc-info/user-cc-info.reducer';
import { getClubFamilyDetails } from 'app/shared/services/club-family-info.service';
import { reset as resetFilter } from 'app/shared/components/advancedSearchModal/advancedSearchModal.reducer';

export interface IFamilyMemberProps extends StateProps, DispatchProps, RouteComponentProps<{ familyCode: string }> {}

export interface IFamilyMemberState {
  searchModalIsOpen: boolean;
}
class FamilyMember extends React.Component<IFamilyMemberProps, IFamilyMemberState> {
  constructor(props: IFamilyMemberProps) {
    super(props);
    this.state = {
      searchModalIsOpen: false,
    };
  }

  async componentDidMount() {
    this.props.getUsersWithFilter(this.props.match.params.familyCode);
  }

  componentWillUnmount() {
    this.props.resetFilter();
    this.props.resetUsers();
  }

  showSearchModal = (): void => {
    this.setState({
      searchModalIsOpen: true,
    });
  };

  toggleSearchModal = (): void => {
    this.setState({
      searchModalIsOpen: !this.state.searchModalIsOpen,
    });
  };

  onEditButtonClick = (userCCInfoId?: number): void => {};

  render() {
    const { users, match } = this.props;
    const { searchModalIsOpen } = this.state;
    const familyName = getClubFamilyDetails(match.params.familyCode).name;
    return (
      <div>
        <FilterSearchBar
          isOpen={searchModalIsOpen}
          toggleModal={this.toggleSearchModal}
          familyCode={this.props.match.params.familyCode}
          searchUsers={this.props.getUsersWithFilter}
        />
        <h2 id="event-activity-heading" className="event-module-heading">
          {familyName ? translate(familyName) : null}
        </h2>
        <div className="mx-4">
          <AuthorizationChecker ccRole={CCRole.ADMIN}>
            <Link
              className="btn btn-action jh-create-entity w-100 my-2"
              to={{ pathname: `/entity/members/cc-family/${match.params.familyCode}/new`, state: { from: this.props.match.url } }}
            >
              <Translate contentKey="entity.action.add">Add</Translate>
            </Link>
          </AuthorizationChecker>
          <InputGroup>
            <InputGroupAddon className="search-bar-prepend" addonType="prepend" color="white">
              {/* ADD IN SEARCH ONCLICK TO THE BUTTON BELOW*/}
              <Button color="primary">
                <FontAwesomeIcon icon="search" />
              </Button>
            </InputGroupAddon>
            <Input placeholder="Type a name to filter" className="search-bar-input" />
            <InputGroupAddon addonType="append">
              <Button className="search-bar-append" onClick={this.toggleSearchModal}>
                <FontAwesomeIcon icon="filter" color="#07ADE1" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {users && users.length > 0 ? (
            <div>
              {users.map(user => (
                <MemberCard
                  key={user.id}
                  userCCInfo={user}
                  editPath={{ pathname: `/entity/members/cc-family/${user.id}/edit`, state: { from: this.props.match.url } }}
                />
              ))}
            </div>
          ) : (
            <div className="alert alert-warning my-3">
              <Translate contentKey="clubmanagementApp.clubFamily.member.notFound">No CC Family Member found</Translate>
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
  getUsersWithFilter,
  resetFilter,
  resetUsers,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FamilyMember);
