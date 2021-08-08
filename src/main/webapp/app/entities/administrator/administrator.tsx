import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../styles/member-module.scss';
import { IRootState } from 'app/shared/reducers';
import AuthorizationChecker from 'app/shared/components/authorization-checker/authorization-checker';
import CustomTab from 'app/shared/components/customTab/custom-tab';
import { memberTabList } from 'app/shared/util/tab.constants';
import CCRole from 'app/shared/model/enum/cc-role.enum';
import ListingCard from 'app/shared/components/listing-card/listing-card';
import { concatFullName } from 'app/shared/util/string-util';
import { AdministratorStatus } from 'app/shared/model/administrator.model';
import {
  getEntities,
  setSelectedAdministratorId,
  setShowActionOptions,
  setSelectedYearSessionFilter,
  getYearSessionOptions,
} from './administrator.reducer';
import FilterButton from 'app/shared/components/filterButton/filterButton';
import EventModal from 'app/shared/components/eventModal/event-modal';

export interface IAdministratorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Administrator extends React.Component<IAdministratorProps> {
  constructor(props: IAdministratorProps) {
    super(props);
    this.state = {
      showYearSessionOptions: false,
    };
  }

  async componentDidMount() {
    await this.props.getYearSessionOptions(0, 12, 'value,desc');
    this.props.getEntities(this.props.selectedYearSessionFilter, AdministratorStatus.ACTIVE);
  }

  showCardAction = (administratorId?: number): void => {
    if (typeof administratorId === 'undefined') return;
    this.props.setSelectedAdministratorId(administratorId);
    this.props.setShowActionOptions(true);
  };

  toggleShowOptions = () => {
    this.props.setShowActionOptions(!this.props.showActionOptions);
  };

  setYearSession = (yearSession: string): void => {
    this.props.setSelectedYearSessionFilter(yearSession);
    this.props.getEntities(yearSession, AdministratorStatus.ACTIVE);
  };

  render() {
    const {
      administratorList,
      match,
      selectedAdministratorId,
      yearSessionOptions,
      selectedYearSessionFilter,
      showActionOptions,
    } = this.props;
    return (
      <div>
        <h2 id="administrator-heading" className="member-module-heading">
          <Translate contentKey="clubmanagementApp.administrator.home.title">Administrators</Translate>
          <FilterButton selectedValue={selectedYearSessionFilter} filterOptions={yearSessionOptions} onChange={this.setYearSession} />
        </h2>
        <div className="my-3">
          <CustomTab tabList={memberTabList} currentTab="Administrator" />
        </div>
        <div className="mx-4">
          <AuthorizationChecker ccRole={CCRole.ADMIN}>
            <div className="text-center">
              <Link to={`${match.url}/new`} className="btn btn-action jh-create-entity mobile-fullWidth my-2" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="entity.action.add">Add</Translate>
              </Link>
            </div>
          </AuthorizationChecker>
          {administratorList && administratorList.length > 0 ? (
            administratorList.map((administrator, i) => (
              <ListingCard
                key={`administrator-${administrator.id}`}
                showActionMenu
                title={concatFullName(administrator.firstName ?? '', administrator.lastName ?? '')}
                actionMenuHandler={this.showCardAction.bind(this, administrator.id)}
                actionMenuAuthorizationProps={{
                  ccRole: CCRole.HEAD,
                }}
              >
                <span className="card-item d-block mb-2">
                  <span className="font-weight-bolder text-dark">{administrator.role}</span>
                </span>
              </ListingCard>
            ))
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="clubmanagementApp.administrator.home.notFound">No Administrators found</Translate>
            </div>
          )}
        </div>

        <EventModal
          isOpen={showActionOptions}
          updatePath={`${match.url}/${selectedAdministratorId}/edit`}
          deletePath={`${match.url}/${selectedAdministratorId}/delete`}
          toggleModal={this.toggleShowOptions}
          updateBtnAuthorizationProps={{
            ccRole: CCRole.HEAD,
          }}
          deleteBtnAuthorizationProps={{
            ccRole: CCRole.HEAD,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ administrator }: IRootState) => ({
  administratorList: administrator.entities,
  selectedAdministratorId: administrator.selectedAdministratorId,
  showActionOptions: administrator.showActionOptions,
  selectedYearSessionFilter: administrator.selectedYearSessionFilter,
  yearSessionOptions: administrator.yearSessionOptions,
});

const mapDispatchToProps = {
  getEntities,
  setSelectedAdministratorId,
  setShowActionOptions,
  setSelectedYearSessionFilter,
  getYearSessionOptions,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Administrator);
