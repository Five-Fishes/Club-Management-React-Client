import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Label, Input } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { getYearSessionOptions } from 'app/entities/user-cc-info/user-cc-info.reducer';
import { getCourseProgramOptions } from 'app/entities/user-uni-info/user-uni-info.reducer';
import { IFilter, setEntity } from './advancedSearchModal.reducer';

import './advancedSearchModal.scss';

interface IFilterSearchBarProps extends StateProps, DispatchProps {
  isOpen: boolean;
  toggleModal: () => void;
  familyCode: string;
  searchUsers: (familyCode: string, filters: any) => void;
}

interface IAdvancedSearchModalState {
  filters: IFilter;
}

class AdvancedSearchModal extends React.Component<IFilterSearchBarProps, IAdvancedSearchModalState> {
  constructor(props: IFilterSearchBarProps) {
    super(props);
    this.state = {
      filters: {
        userFirstName: '',
        userLastName: '',
        courseProgramId: undefined,
        yearSession: '',
      },
    };
  }

  componentDidUpdate(prevProps: IFilterSearchBarProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.props.getYearSessionOptions(0, 12, 'value,desc');
      this.props.getCourseProgramOptions(0, 12, 'value,desc');
    }
  }

  renderYearSessionOptions = () =>
    this.props.yearSessionOptions.map(year => (
      <option key={year} value={year}>
        {year}
      </option>
    ));

  renderCourseProgramOptions = () =>
    this.props.courseProgramOptions.map(course => (
      <option key={course?.id} value={course?.id}>
        {course?.name}
      </option>
    ));

  searchEntities = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { familyCode, searchUsers, filters } = this.props;
      const entity = {
        ...filters,
        ...values,
      };
      this.props.setFilter(entity);
      searchUsers(familyCode, entity);
      this.props.toggleModal();
    }
  };

  render() {
    const { isOpen, familyCode, toggleModal, filters } = this.props;
    return (
      <Modal id="myModal" className="advanced-search-modal" size="md" isOpen={isOpen} toggle={toggleModal} centered>
        <ModalHeader toggle={toggleModal} className="filter-modal-header" />
        <ModalBody className="filter-modal-body">
          <h2 className="text-center mb-4">Advanced Search</h2>
          <AvForm model={filters ?? {}} onSubmit={this.searchEntities}>
            <AvGroup>
              <AvInput id="first-name" type="text" placeholder="First Name" className="form-control" name="userFirstName" autoFocus />
            </AvGroup>
            <AvGroup>
              <AvInput id="last-name" type="text" placeholder="Last Name" className="form-control" name="userLastName" autoFocus />
            </AvGroup>
            <AvGroup>
              <AvInput id="course-program" type="select" placeholder="Course Program" className="form-control" name="courseProgramId">
                <option value="">Course Program</option>
                {this.renderCourseProgramOptions()}
              </AvInput>
            </AvGroup>
            <AvGroup>
              <AvInput id="enrolled-year" type="select" placeholder="Enrolled Year" className="form-control" name="yearSession">
                <option value="">Enrolled Year</option>
                {this.renderYearSessionOptions()}
              </AvInput>
            </AvGroup>
            {familyCode ? null : (
              <AvGroup>
                <h6 className="ml-2 ">CC Family</h6>
                <div className="family-button-group">
                  <Button className="rounded-pill m-1" color="bimu">
                    Bimu
                  </Button>
                  <Button className="rounded-pill m-1" color="jinlong">
                    Jin Long
                  </Button>
                  <Button className="rounded-pill m-1" color="nemo">
                    Nemo
                  </Button>
                  <Button className="rounded-pill m-1" color="peacock">
                    Peacock
                  </Button>
                  <Button className="rounded-pill m-1" color="qicai">
                    Qi Cai
                  </Button>
                </div>
              </AvGroup>
            )}
            <div className="general-buttonContainer--flexContainer mt-5">
              <Button className="general-button--width" id="cancel-save" color="cancel" onClick={this.props.toggleModal}>
                <Translate contentKey="entity.action.cancel">Cancel</Translate>
              </Button>
              &nbsp;
              <Button className="general-button--width" color="action" id="save-entity" type="submit">
                Search
              </Button>
            </div>
          </AvForm>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = ({ userCCInfo, userUniInfo, advancedSearchModal }: IRootState) => ({
  yearSessionOptions: userCCInfo.yearSessionOptions,
  courseProgramOptions: userUniInfo.courseProgramOptions,
  filters: advancedSearchModal.filters,
});

const mapDispatchToProps = {
  getYearSessionOptions,
  getCourseProgramOptions,
  setFilter: setEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchModal);
