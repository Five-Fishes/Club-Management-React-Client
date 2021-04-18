import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { Row, Col, Button, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import moment from 'moment';

export interface ICompleteUserProfileProps extends StateProps, RouteComponentProps<{}> {}

export class CompleteUserProfile extends React.Component<ICompleteUserProfileProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2 id="complete-profile-heading">
          <Translate contentKey="clubmanagementApp.completeProfile.title">Complete Profile</Translate>
        </h2>
        <Row className="justify-content-center">
          <Col md="8">
            {/* {loading ? (
              <p>Loading...</p>
            ) : ( */}
            {/* onSubmit={this.updateProfile} */}
            <AvForm model={{}}>
              <AvGroup>
                {/* <Label id="firstName" for="first-name">
                    <Translate contentKey="clubmanagementApp.userProfile.firstName">First Name</Translate>
                  </Label> */}
                <AvField
                  id="first-name"
                  label={translate('clubmanagementApp.userProfile.firstName')}
                  type="text"
                  name="firstName"
                  validate={{
                    required: { value: true, errorMessage: 'Please enter your First Name' },
                    maxLength: { value: 200, errorMessage: 'First Name cannot be more than 200 characters' }
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
                    maxLength: { value: 200, errorMessage: 'Last Name cannot be more than 200 characters' }
                  }}
                />
              </AvGroup>

              <AvGroup>
                <Label id="gender" for="gender">
                  <Translate contentKey="clubmanagementApp.userProfile.gender">Gender</Translate>
                </Label>
                <AvInput id="gender" type="select" className="form-control" name="gender">
                  <option value="" selected disabled>
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
                  validate={{
                    required: { value: true, errorMessage: 'Please enter your Phone Number' },
                    pattern: { value: '^([0-9]{6,20})$', errorMessage: 'Please enter a valid Phone Number' }
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
                        value: moment()
                          .subtract(40, 'years')
                          .format(APP_LOCAL_DATE_FORMAT)
                      },
                      end: { value: moment().format(APP_LOCAL_DATE_FORMAT) }
                    }
                  }}
                />
              </AvGroup>

              <AvGroup>
                <Label id="faculty" for="faculty">
                  <Translate contentKey="clubmanagementApp.userUniInfo.faculty">Faculty</Translate>
                </Label>
                <AvInput id="faculty" type="select" className="form-control" name="faculty">
                  <option value="" selected disabled>
                    {translate('global.select.selectOne')}
                  </option>
                  {/* TODO: Get Faculty List */}
                </AvInput>
              </AvGroup>

              {/* TODO: Display Course Program for selected Fac only */}
              <AvGroup>
                <Label id="courseProgram" for="courseProgram">
                  <Translate contentKey="clubmanagementApp.userUniInfo.courseProgram">Faculty</Translate>
                </Label>
                <AvInput id="courseProgram" type="select" className="form-control" name="courseProgram">
                  <option value="" selected disabled>
                    {translate('global.select.selectOne')}
                  </option>
                  {/* TODO: Get Course Program List */}
                </AvInput>
              </AvGroup>

              <AvGroup>
                <Label id="intakeYearSession" for="intakeYearSession">
                  <Translate contentKey="clubmanagementApp.userUniInfo.intakeYearSession">Intake Year Session</Translate>
                </Label>
                <AvInput id="intakeYearSession" type="select" className="form-control" name="yearSession">
                  <option value="" selected disabled>
                    {translate('global.select.selectOne')}
                  </option>
                  {/* TODO: Get Lastest 10 available Year Session */}
                </AvInput>
              </AvGroup>

              <AvGroup>
                <Label id="intakeSemester" for="intakeSemester">
                  <Translate contentKey="clubmanagementApp.userUniInfo.intakeSemester">Intake Semster</Translate>
                </Label>
                <AvInput id="intakeSemester" type="select" className="form-control" name="intakeSemester">
                  <option value="" selected disabled>
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
                    maxLength: { value: '200', errorMessage: 'Provide the location currently stay in within 200 chracters' }
                  }}
                />
              </AvGroup>

              {/* <span className="text-error">{errorMessage ? errorMessage.response.data.detail : ''}</span> */}
              <div className="text-center mx-4 justify-content-between justify-content-md-center mb-2">
                {/* disabled={updating} */}
                <Button color="action" id="save-entity" type="submit">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.complete">Complete</Translate>
                </Button>
              </div>
            </AvForm>
            {/* )} */}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(CompleteUserProfile);