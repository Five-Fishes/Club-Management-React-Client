import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './club-family.reducer';
import { IClubFamily } from 'app/shared/model/club-family.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IClubFamilyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IClubFamilyUpdateState {
  isNew: boolean;
}

export class ClubFamilyUpdate extends React.Component<IClubFamilyUpdateProps, IClubFamilyUpdateState> {
  constructor(props: IClubFamilyUpdateProps) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id,
    };
  }

  componentWillUpdate(nextProps: IClubFamilyUpdateProps, nextState: IClubFamilyUpdateState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  onBlobChange = (isAnImage: boolean, name: string) => (event: any) => {
    setFileData(event, (contentType: any, data: any) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = (name: any) => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { clubFamilyEntity } = this.props;
      const entity = {
        ...clubFamilyEntity,
        ...values,
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/club-family');
  };

  render() {
    const { clubFamilyEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { slogan } = clubFamilyEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.clubFamily.home.createOrEditLabel">
              <Translate contentKey="clubmanagementApp.clubFamily.home.createOrEditLabel">Create or edit a ClubFamily</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : clubFamilyEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="club-family-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="club-family-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="club-family-name">
                    <Translate contentKey="clubmanagementApp.clubFamily.name">Name</Translate>
                  </Label>
                  <AvField id="club-family-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="sloganLabel" for="club-family-slogan">
                    <Translate contentKey="clubmanagementApp.clubFamily.slogan">Slogan</Translate>
                  </Label>
                  <AvInput id="club-family-slogan" type="textarea" name="slogan" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/club-family" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  clubFamilyEntity: storeState.clubFamily.entity,
  loading: storeState.clubFamily.loading,
  updating: storeState.clubFamily.updating,
  updateSuccess: storeState.clubFamily.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClubFamilyUpdate);
