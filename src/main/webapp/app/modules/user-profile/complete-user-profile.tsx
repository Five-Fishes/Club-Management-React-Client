import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { Row, Col, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import moment from 'moment';
import { getCourseProgramByFacultyId, getFacultyList, getYearSessionList } from 'app/shared/services/uni-academic-info.service';
import { completeUserProfile, getCurrentUserProfile } from './user-profile.reducer';
import { IRedirectLocationState } from 'app/shared/auth/app-route';
import { convertDateTimeFromServerToLocaleDate } from 'app/shared/util/date-utils';

export interface ICompleteUserProfileProps extends StateProps, DispatchProps, RouteComponentProps<{}, any, IRedirectLocationState> {}

class CompleteUserProfile extends React.Component<ICompleteUserProfileProps, {}> {
  constructor(props: ICompleteUserProfileProps) {
    super(props);
  }

  componentDidMount() {
    getFacultyList(0, 40, 'shortName');
    getYearSessionList(0, 10, 'value');
    this.props.getCurrentUserProfile();
  }

  fetchCourseProgramByFaculty(e: any) {
    const facultyId = e.target.value;
    getCourseProgramByFacultyId(facultyId, 0, 20, 'name');
  }

  completeProfile = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const entity = {
        ...values,
        courseProgramId: values.courseProgram,
        intakeSemester: values.intakeSemesterValue,
        yearSession: values.yearSessionValue,
      };
      this.props.completeUserProfile(entity);
    }
  };

  render() {
    const { isProfileCompleted, loading, updating, errResponse, facultyList, courseProgramList, yearSessionList, userProfile } = this.props;
    if (isProfileCompleted) {
      return <Redirect to="/" />;
    }
    return (
      <div className="mx-3">
        <h2 id="complete-profile-heading">
          <Translate contentKey="clubmanagementApp.completeProfile.title">Complete Profile</Translate>
        </h2>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={userProfile} onSubmit={this.completeProfile}>
                {window.console.log(userProfile)}
                <AvGroup>
                  <AvField
                    id="first-name"
                    label={translate('clubmanagementApp.userProfile.firstName')}
                    type="text"
                    name="firstName"
                    validate={{
                      required: { value: true, errorMessage: 'Please enter your First Name' },
                      maxLength: { value: 200, errorMessage: 'First Name cannot be more than 200 characters' },
                    }}
                  />
                </AvGroup>

                <AvGroup>
                  <AvField
                    id="last-name"
                    label={translate('clubmanagementApp.userProfile.lastName')}
                    type="text"
                    name="lastName"
                    validate={{
                      required: { value: true, errorMessage: 'Please enter your Last Name' },
                      maxLength: { value: 200, errorMessage: 'Last Name cannot be more than 200 characters' },
                    }}
                  />
                </AvGroup>

                <AvGroup>
                  <Label id="gender" for="gender">
                    <Translate contentKey="clubmanagementApp.userProfile.gender">Gender</Translate>
                  </Label>
                  <AvInput
                    id="gender"
                    type="select"
                    className="form-control"
                    name="gender"
                    validate={{
                      required: { value: true, errorMessage: 'Please select your gender' },
                    }}
                  >
                    <option value="" disabled>
                      {translate('global.select.selectOne')}
                    </option>
                    <option value="FEMALE">{translate('clubmanagementApp.userProfile.genderValue.FEMALE')}</option>
                    <option value="MALE">{translate('clubmanagementApp.userProfile.genderValue.MALE')}</option>
                  </AvInput>
                </AvGroup>

                <AvGroup>
                  <AvField
                    id="phoneNumber"
                    label={translate('clubmanagementApp.userProfile.phoneNumber')}
                    type="text"
                    name="phoneNumber"
                    placeholder="E.g 0123857221"
                    validate={{
                      required: { value: true, errorMessage: 'Please enter your Phone Number' },
                      pattern: { value: '^([0-9]{6,11})$', errorMessage: 'Please enter a valid Phone Number' },
                    }}
                  />
                </AvGroup>

                <AvGroup>
                  <Label id="date-of-birth" for="date-of-birth">
                    <Translate contentKey="clubmanagementApp.userProfile.dateOfBirth">Date of Birth</Translate>
                  </Label>
                  <AvInput
                    id="date-of-birth"
                    type="date"
                    className="form-control"
                    name="dateOfBirth"
                    placeholder={'DD/MM/YYYY'}
                    required
                    validate={{
                      dateRange: {
                        format: APP_LOCAL_DATE_FORMAT,
                        start: {
                          value: moment().subtract(40, 'years').format(APP_LOCAL_DATE_FORMAT),
                        },
                        end: { value: moment().format(APP_LOCAL_DATE_FORMAT) },
                      },
                    }}
                    value={userProfile.dateOfBirth ? userProfile.dateOfBirth.format(APP_LOCAL_DATE_FORMAT) : ''}
                  />
                </AvGroup>

                {facultyList && facultyList.length > 0 && (
                  <AvGroup>
                    <Label id="faculty" for="faculty">
                      <Translate contentKey="clubmanagementApp.userUniInfo.faculty">Faculty</Translate>
                    </Label>
                    <AvInput
                      id="faculty"
                      type="select"
                      className="form-control"
                      name="facultyId"
                      onChange={this.fetchCourseProgramByFaculty}
                      validate={{
                        required: { value: true, errorMessage: 'Please select your Faculty' },
                      }}
                    >
                      <option value={''} disabled>
                        {translate('global.select.selectOne')}
                      </option>
                      {facultyList.map((faculty, i) => (
                        <option key={`faculty-${faculty.id}`} value={faculty.id}>
                          {faculty.shortName}
                        </option>
                      ))}
                    </AvInput>
                  </AvGroup>
                )}

                {courseProgramList && courseProgramList.length > 0 && (
                  <AvGroup>
                    <Label id="courseProgram" for="courseProgram">
                      <Translate contentKey="clubmanagementApp.userUniInfo.courseProgram">Course Program</Translate>
                    </Label>
                    <AvInput
                      id="courseProgram"
                      type="select"
                      className="form-control"
                      name="courseProgram"
                      validate={{
                        required: { value: true, errorMessage: 'Please select your Course Program' },
                      }}
                    >
                      <option value={''} disabled>
                        {translate('global.select.selectOne')}
                      </option>
                      {courseProgramList.map((courseProgram, i) => (
                        <option key={`courseProgram-${courseProgram.id}`} value={courseProgram.id}>
                          {courseProgram.name}
                        </option>
                      ))}
                    </AvInput>
                  </AvGroup>
                )}

                {yearSessionList && yearSessionList.length > 0 && (
                  <AvGroup>
                    <Label id="intakeYearSession" for="intakeYearSession">
                      <Translate contentKey="clubmanagementApp.userUniInfo.intakeYearSession">Intake Year Session</Translate>
                    </Label>
                    <AvInput
                      id="intakeYearSession"
                      type="select"
                      className="form-control"
                      name="yearSessionValue"
                      validate={{
                        required: { value: true, errorMessage: 'Please select your Intake Year Session' },
                      }}
                      value={userProfile.yearSession ? userProfile.yearSession : ''}
                    >
                      <option value={''} disabled>
                        {translate('global.select.selectOne')}
                      </option>
                      {yearSessionList.length > 0 &&
                        yearSessionList.map((yearSession, i) => (
                          <option key={`yearSession-${yearSession.id}`} value={yearSession.value}>
                            {yearSession.value}
                          </option>
                        ))}
                    </AvInput>
                  </AvGroup>
                )}

                <AvGroup>
                  <Label id="intakeSemester" for="intakeSemester">
                    <Translate contentKey="clubmanagementApp.userUniInfo.intakeSemester">Intake Semster</Translate>
                  </Label>
                  <AvInput
                    id="intakeSemester"
                    type="select"
                    className="form-control"
                    name="intakeSemesterValue"
                    validate={{
                      required: { value: true, errorMessage: 'Please select your Intake Semster' },
                    }}
                    value={userProfile.intakeSemester ? userProfile.intakeSemester : ''}
                  >
                    <option value={''} disabled>
                      {translate('global.select.selectOne')}
                    </option>
                    <option value="1">{translate('clubmanagementApp.userUniInfo.semesterValue.semOne')}</option>
                    <option value="2">{translate('clubmanagementApp.userUniInfo.semesterValue.semTwo')}</option>
                  </AvInput>
                </AvGroup>

                <AvGroup>
                  <AvField
                    id="stayIn"
                    label={translate('clubmanagementApp.userUniInfo.stayIn')}
                    type="text"
                    name="stayIn"
                    validate={{
                      required: { value: true, errorMessage: 'Please enter your current stay location' },
                      maxLength: { value: '200', errorMessage: 'Provide the location currently stay in within 200 chracters' },
                    }}
                  />
                </AvGroup>

                <span className="text-error">{errResponse ? errResponse.response?.data?.detail : ''}</span>
                <div className="text-center mx-4 justify-content-between justify-content-md-center mb-2">
                  <Button color="action" id="save-entity" type="submit" disabled={updating}>
                    <FontAwesomeIcon icon="save" />
                    &nbsp;
                    <Translate contentKey="entity.action.complete">Complete</Translate>
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

const mapStateToProps = ({ authentication, user }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  isProfileCompleted: authentication.isProfileCompleted,
  ...user,
});

const mapDispatchToProps = {
  completeUserProfile,
  getCurrentUserProfile,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompleteUserProfile);
