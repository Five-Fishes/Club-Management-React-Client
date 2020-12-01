import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './claim.reducer';
import { IClaim } from 'app/shared/model/claim.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClaimDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ClaimDetail extends React.Component<IClaimDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { claimEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="clubmanagementApp.claim.detail.title">Claim</Translate> [<b>{claimEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="receiptId">
                <Translate contentKey="clubmanagementApp.claim.receiptId">Receipt Id</Translate>
              </span>
            </dt>
            <dd>{claimEntity.receiptId}</dd>
            <dt>
              <span id="transactionId">
                <Translate contentKey="clubmanagementApp.claim.transactionId">Transaction Id</Translate>
              </span>
            </dt>
            <dd>{claimEntity.transactionId}</dd>
            <dt>
              <span id="amount">
                <Translate contentKey="clubmanagementApp.claim.amount">Amount</Translate>
              </span>
            </dt>
            <dd>{claimEntity.amount}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="clubmanagementApp.claim.status">Status</Translate>
              </span>
            </dt>
            <dd>{claimEntity.status}</dd>
            <dt>
              <span id="receiptUrl">
                <Translate contentKey="clubmanagementApp.claim.receiptUrl">Receipt Url</Translate>
              </span>
            </dt>
            <dd>{claimEntity.receiptUrl}</dd>
            <dt>
              <span id="fileName">
                <Translate contentKey="clubmanagementApp.claim.fileName">File Name</Translate>
              </span>
            </dt>
            <dd>{claimEntity.fileName}</dd>
            <dt>
              <span id="fileType">
                <Translate contentKey="clubmanagementApp.claim.fileType">File Type</Translate>
              </span>
            </dt>
            <dd>{claimEntity.fileType}</dd>
          </dl>
          <Button tag={Link} to="/entity/claim" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/claim/${claimEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ claim }: IRootState) => ({
  claimEntity: claim.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClaimDetail);
