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
    const { administratorList, match, selectedAdministratorId, yearSessionOptions, selectedYearSessionFilter } = this.props;
    return (
      <div>
        <h2 id="administrator-heading" className="member-module-heading">
          <Translate contentKey="clubmanagementApp.administrator.home.title">Administrators</Translate>
          {/* TODO: Year Session Filter Component */}
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

        {/* TODO: Confirm on Modal UI */}
        <Modal isOpen={this.props.showActionOptions} toggle={this.toggleShowOptions} centered>
          <ModalHeader toggle={this.toggleShowOptions} />
          <ModalBody className="px-4">
            <h2 className="text-center">Options</h2>
            <AuthorizationChecker ccRole={CCRole.HEAD}>
              <Button
                tag={Link}
                to={`${match.url}/${selectedAdministratorId}/edit`}
                onClick={this.toggleShowOptions}
                color="secondary"
                className="d-block mx-auto my-3 w-100"
              >
                <span>
                  <Translate contentKey="entity.action.update">Update</Translate>
                </span>
              </Button>
            </AuthorizationChecker>
            <AuthorizationChecker ccRole={CCRole.HEAD}>
              <Button
                tag={Link}
                to={`${match.url}/${selectedAdministratorId}/delete`}
                onClick={this.toggleShowOptions}
                color="cancel"
                className="d-block mx-auto my-3 w-100"
              >
                <span>
                  <Translate contentKey="entity.action.delete">Delete</Translate>
                </span>
              </Button>
            </AuthorizationChecker>
          </ModalBody>
        </Modal>
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
