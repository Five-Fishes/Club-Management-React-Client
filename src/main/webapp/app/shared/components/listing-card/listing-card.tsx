import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Row, Col } from 'reactstrap';
import './listing-card.scss';
import AuthorizationChecker, { IAuthorizationCheckerOwnProps } from '../authorization-checker/authorization-checker';

export interface IListingCardOwnProps {
  showActionMenu: boolean;
  actionMenuHandler?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  title?: string;
  date?: any;
  actionMenuAuthorizationProps?: IAuthorizationCheckerOwnProps;
}

export class ListingCard extends React.Component<IListingCardOwnProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const { showActionMenu, actionMenuHandler, title, date, actionMenuAuthorizationProps, children } = this.props;
    return (
      <div className="card-container container my-3">
        <Row className="align-items-center justify-content-center">
          <Col xs="10">
            {Boolean(title) && <span className="font-weight-bold text-dark d-inline-block mb-1">{title}</span>}
            {Boolean(date) && <span className="d-inline-block mb-1 float-right">{date}</span>}
            {children}
          </Col>
          {showActionMenu && (
            <AuthorizationChecker {...actionMenuAuthorizationProps}>
              <Col xs="1">
                <span onClick={actionMenuHandler} className="hand">
                  <FontAwesomeIcon icon="ellipsis-v" />
                </span>
              </Col>
            </AuthorizationChecker>
          )}
        </Row>
      </div>
    );
  }
}

export default ListingCard;
