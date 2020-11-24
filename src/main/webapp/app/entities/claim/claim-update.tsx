import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './claim.reducer';
import { IClaim } from 'app/shared/model/claim.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IClaimUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IClaimUpdateState {
  isNew: boolean;
}

export class ClaimUpdate extends React.Component<IClaimUpdateProps, IClaimUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
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

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { claimEntity } = this.props;
      const entity = {
        ...claimEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/claim');
  };

  render() {
    const { claimEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.claim.home.createOrEditLabel">
              <Translate contentKey="clubmanagementApp.claim.home.createOrEditLabel">Create or edit a Claim</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : claimEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="claim-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="claim-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="receiptIdLabel" for="claim-receiptId">
                    <Translate contentKey="clubmanagementApp.claim.receiptId">Receipt Id</Translate>
                  </Label>
                  <AvField id="claim-receiptId" type="string" className="form-control" name="receiptId" />
                </AvGroup>
                <AvGroup>
                  <Label id="transactionIdLabel" for="claim-transactionId">
                    <Translate contentKey="clubmanagementApp.claim.transactionId">Transaction Id</Translate>
                  </Label>
                  <AvField id="claim-transactionId" type="string" className="form-control" name="transactionId" />
                </AvGroup>
                <AvGroup>
                  <Label id="amountLabel" for="claim-amount">
                    <Translate contentKey="clubmanagementApp.claim.amount">Amount</Translate>
                  </Label>
                  <AvField id="claim-amount" type="text" name="amount" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="claim-status">
                    <Translate contentKey="clubmanagementApp.claim.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="claim-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && claimEntity.status) || 'OPEN'}
                  >
                    <option value="OPEN">{translate('clubmanagementApp.ClaimStatus.OPEN')}</option>
                    <option value="CLAIMED">{translate('clubmanagementApp.ClaimStatus.CLAIMED')}</option>
                    <option value="SUSPENDED">{translate('clubmanagementApp.ClaimStatus.SUSPENDED')}</option>
                    <option value="EXPIRED">{translate('clubmanagementApp.ClaimStatus.EXPIRED')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="receiptUrlLabel" for="claim-receiptUrl">
                    <Translate contentKey="clubmanagementApp.claim.receiptUrl">Receipt Url</Translate>
                  </Label>
                  <AvField id="claim-receiptUrl" type="text" name="receiptUrl" />
                </AvGroup>
                <AvGroup>
                  <Label id="fileNameLabel" for="claim-fileName">
                    <Translate contentKey="clubmanagementApp.claim.fileName">File Name</Translate>
                  </Label>
                  <AvField id="claim-fileName" type="text" name="fileName" />
                </AvGroup>
                <AvGroup>
                  <Label id="fileTypeLabel" for="claim-fileType">
                    <Translate contentKey="clubmanagementApp.claim.fileType">File Type</Translate>
                  </Label>
                  <AvField id="claim-fileType" type="text" name="fileType" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/claim" replace color="info">
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
  claimEntity: storeState.claim.entity,
  loading: storeState.claim.loading,
  updating: storeState.claim.updating,
  updateSuccess: storeState.claim.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClaimUpdate);
