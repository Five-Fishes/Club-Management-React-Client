import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './debt.reducer';
import { IDebt } from 'app/shared/model/debt.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDebtUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDebtUpdateState {
  isNew: boolean;
}

export class DebtUpdate extends React.Component<IDebtUpdateProps, IDebtUpdateState> {
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
      const { debtEntity } = this.props;
      const entity = {
        ...debtEntity,
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
    this.props.history.push('/entity/debt');
  };

  render() {
    const { debtEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="clubmanagementApp.debt.home.createOrEditLabel">
              <Translate contentKey="clubmanagementApp.debt.home.createOrEditLabel">Create or edit a Debt</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : debtEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="debt-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="debt-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="receiptIdLabel" for="debt-receiptId">
                    <Translate contentKey="clubmanagementApp.debt.receiptId">Receipt Id</Translate>
                  </Label>
                  <AvField id="debt-receiptId" type="string" className="form-control" name="receiptId" />
                </AvGroup>
                <AvGroup>
                  <Label id="eventAttendeeIdLabel" for="debt-eventAttendeeId">
                    <Translate contentKey="clubmanagementApp.debt.eventAttendeeId">Event Attendee Id</Translate>
                  </Label>
                  <AvField id="debt-eventAttendeeId" type="string" className="form-control" name="eventAttendeeId" />
                </AvGroup>
                <AvGroup>
                  <Label id="amountLabel" for="debt-amount">
                    <Translate contentKey="clubmanagementApp.debt.amount">Amount</Translate>
                  </Label>
                  <AvField id="debt-amount" type="text" name="amount" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="debt-status">
                    <Translate contentKey="clubmanagementApp.debt.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="debt-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && debtEntity.status) || 'OPEN'}
                  >
                    <option value="OPEN">{translate('clubmanagementApp.DebtStatus.OPEN')}</option>
                    <option value="COLLECTED">{translate('clubmanagementApp.DebtStatus.COLLECTED')}</option>
                    <option value="UNREACHABLE">{translate('clubmanagementApp.DebtStatus.UNREACHABLE')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="receiptUrlLabel" for="debt-receiptUrl">
                    <Translate contentKey="clubmanagementApp.debt.receiptUrl">Receipt Url</Translate>
                  </Label>
                  <AvField id="debt-receiptUrl" type="text" name="receiptUrl" />
                </AvGroup>
                <AvGroup>
                  <Label id="fileNameLabel" for="debt-fileName">
                    <Translate contentKey="clubmanagementApp.debt.fileName">File Name</Translate>
                  </Label>
                  <AvField id="debt-fileName" type="text" name="fileName" />
                </AvGroup>
                <AvGroup>
                  <Label id="fileTypeLabel" for="debt-fileType">
                    <Translate contentKey="clubmanagementApp.debt.fileType">File Type</Translate>
                  </Label>
                  <AvField id="debt-fileType" type="text" name="fileType" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/debt" replace color="info">
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
  debtEntity: storeState.debt.entity,
  loading: storeState.debt.loading,
  updating: storeState.debt.updating,
  updateSuccess: storeState.debt.updateSuccess
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
)(DebtUpdate);
