import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { getYearSessionOptions } from 'app/entities/user-cc-info/user-cc-info.reducer';
import { getEntities as getFacultyOptions } from 'app/entities/faculty/faculty.reducer';
import { IFaculty } from 'app/shared/model/faculty.model';

import './filterSearchBar.scss';

interface IFilterSearchBarProps extends StateProps, DispatchProps {
  showModal: boolean;
  toggleModal: () => void;
  familyCode: string;
  searchUsers: (familyCode: string, filters: any) => void;
}

interface IFilterSearchBarState {
  filters: {
    userFirstName?: string;
    userLastName?: string;
    faculty?: IFaculty;
    intakeYearSession?: string;
  };
}

class FilterSearchBar extends React.Component<IFilterSearchBarProps, IFilterSearchBarState> {
  constructor(props: IFilterSearchBarProps) {
    super(props);
    this.state = {
      filters: {
        userFirstName: '',
        userLastName: '',
        faculty: undefined,
        intakeYearSession: '',
      },
    };
  }

  componentDidMount() {
    this.props.getYearSessionOptions(0, 12, 'value,desc');
    this.props.getFacultyOptions();
  }

  renderYearSessionOptions = () => this.props.yearSessionOptions.map(year => <option key={year}>{year}</option>);

  renderFacultyOptions = () => this.props.facultyOptions.map(faculty => <option key={faculty?.id}>{faculty?.name}</option>);

  searchEntities = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { filters } = this.state;
      const { familyCode, searchUsers } = this.props;
      const entity = {
        ...filters,
        ...values,
      };
      searchUsers(familyCode, entity);
      this.props.toggleModal();
    }
  };

  render() {
    const { showModal, familyCode } = this.props;
    return (
      <Modal id="myModal" className="advanced-search-modal" size="md" isOpen={showModal} toggle={this.props.toggleModal} centered>
        <ModalHeader toggle={this.props.toggleModal} className="filter-modal-header" />
        <ModalBody className="filter-modal-body">
          <h2 className="text-center mb-4">Advanced Search</h2>
          <AvForm model={this.state.filters} onSubmit={this.searchEntities}>
            <AvGroup>
              <AvInput id="first-name" type="text" placeholder="First Name" className="form-control" name="userFirstName" autoFocus />
            </AvGroup>
            <AvGroup>
              <AvInput id="last-name" type="text" placeholder="Last Name" className="form-control" name="userLastName" autoFocus />
            </AvGroup>
            <AvGroup>
              <AvInput id="faculty" type="select" placeholder="Faculty" className="form-control" name="faculty">
                <option disabled value="" hidden>
                  Faculty
                </option>
                {this.renderFacultyOptions()}
              </AvInput>
            </AvGroup>
            <AvGroup>
              <AvInput id="enrolled-year" type="select" placeholder="Enrolled Year" className="form-control" name="intakeYearSession">
                <option disabled value="" hidden>
                  Enrolled Year
                </option>
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

const mapStateToProps = ({ userCCInfo, faculty }: IRootState) => ({
  yearSessionOptions: userCCInfo.yearSessionOptions,
  facultyOptions: faculty.entities,
});

const mapDispatchToProps = {
  getYearSessionOptions,
  getFacultyOptions,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FilterSearchBar);
