import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { Row, Col, Button } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCurrentUserProfile, updateUserProfile } from './user-profile.reducer';
import { IRedirectLocationState } from 'app/shared/auth/app-route';

export interface IUserProfileUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{}, any, IRedirectLocationState> {}

class UserProfileUpdate extends React.Component<IUserProfileUpdateProps, {}> {
  constructor(props: IUserProfileUpdateProps) {
    super(props);
  }

  componentWillUpdate(nextProps: IUserProfileUpdateProps) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    this.props.getCurrentUserProfile();
  }

  updateProfile = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { userProfile } = this.props;
      const updatedEntity = {
        ...userProfile,
        ...values,
      };
      this.props.updateUserProfile(updatedEntity);
    }
  };

  handleClose() {
    this.props.history.push('/profile/stats');
  }

  render() {
    const { loading, updating, errResponse, userProfile } = this.props;
    return (
      <div className="mx-3">
        <h2 id="complete-profile-heading">
          <Translate contentKey="clubmanagementApp.userProfile.home.updateLabel">Update User Profile</Translate>
        </h2>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={userProfile} onSubmit={this.updateProfile}>
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
                  <AvField
                    id="phoneNumber"
                    label={translate('clubmanagementApp.userProfile.phoneNumber')}
                    type="text"
                    name="phoneNumber"
                    placeholder="E.g 0123857221"
                    validate={{
                      required: { value: true, errorMessage: 'Please enter your Phone Number' },
                      pattern: { value: '^([0-9]{6,11})$', errorMessage: 'Please enter a valid Phone Number without Country Code' },
                    }}
                  />
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
                <div className="text-center general-buttonContainer--flexContainer">
                  <Button className="general-button--width" tag={Link} id="cancel-save" to={`/profile/stats`} replace color="cancel">
                    <Translate contentKey="entity.action.cancel">Cancel</Translate>
                  </Button>
                  &nbsp;
                  <Button className="general-button--width" color="action" id="save-entity" type="submit" disabled={updating}>
                    <FontAwesomeIcon icon="save" />
                    &nbsp;
                    <Translate contentKey="entity.action.update">Update</Translate>
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
  ...user,
});

const mapDispatchToProps = {
  getCurrentUserProfile,
  updateUserProfile,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileUpdate);
