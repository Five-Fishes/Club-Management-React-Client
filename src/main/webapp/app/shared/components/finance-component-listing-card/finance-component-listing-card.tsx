import React, { FunctionComponent } from 'react';
import { Row, Col, Button } from 'reactstrap';
import './finance-component-listing-card.scss';
import { Translate } from 'react-jhipster';
import { FinanceActionButton } from 'app/shared/components/finance-action-button/finance-action-button';

export interface IFinanceComponentListingCardWithButtonProps {
  completedAction: string;
  invalidAction: string;
  completedActionColor: string;
  invalidActionColor: string;
  completedActionCallback: () => void;
  invalidActionCallback: () => void;
  onClick: () => void;
  withButton?: boolean;
}

export const FinanceComponentListingCardWithButton: FunctionComponent<IFinanceComponentListingCardWithButtonProps> = ({
  children,
  completedAction,
  invalidAction,
  completedActionColor,
  invalidActionColor,
  completedActionCallback,
  invalidActionCallback,
  onClick,
  withButton,
}) => (
  <div className="card-container container my-3">
    <Row className="align-items-center justify-content-center">
      <Col xs={withButton ? '8' : '12'} onClick={onClick}>
        {children}
      </Col>
      {!!withButton ? (
        <Col xs="4">
          <div className="mb-2">
            <FinanceActionButton
              name={<Translate contentKey={`entity.action.${completedAction}`}>{completedAction}</Translate>}
              color={completedActionColor}
              onClick={completedActionCallback}
            />
          </div>
          <div className="mt-2">
            <FinanceActionButton
              name={<Translate contentKey={`entity.action.${invalidAction}`}>{invalidAction}</Translate>}
              color={invalidActionColor}
              onClick={invalidActionCallback}
            />
          </div>
        </Col>
      ) : null}
    </Row>
  </div>
);
