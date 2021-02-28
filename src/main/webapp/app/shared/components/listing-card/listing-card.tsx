import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Row, Col } from 'reactstrap';
import './listing-card.scss';

export interface IListingCardProps {
  showActionMenu: boolean;
  actionMenuHandler?: Function;
  title?: string;
}

export class ListingCard extends React.Component<IListingCardProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card-container container">
        <Row className="align-items-center justify-content-center">
          <Col xs="10">
            {this.props.title && this.props.title.hasOwnProperty('value') ? (
              <span className="font-weight-bold text-dark d-block mb-1">{this.props.title}</span>
            ) : null}
            {this.props.children}
          </Col>
          <Col xs="1">
            {this.props.showActionMenu ? (
              <span onClick={this.props.actionMenuHandler()} className="hand">
                <FontAwesomeIcon icon="ellipsis-v" />
              </span>
            ) : null}
          </Col>
        </Row>
      </div>
    );
  }
}
