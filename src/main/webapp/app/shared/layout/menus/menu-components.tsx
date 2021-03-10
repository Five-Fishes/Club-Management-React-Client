import React from 'react';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NavDropdown = props => (
  <UncontrolledDropdown nav inNavbar id={props.id} className="d-flex">
    <DropdownToggle nav caret className="d-flex align-items-center my-auto">
      <FontAwesomeIcon icon={props.icon} className="mr-2" />
      <span className="d-none d-md-inline">{props.name}</span>
    </DropdownToggle>
    <DropdownMenu right style={props.style}>
      {props.children}
    </DropdownMenu>
  </UncontrolledDropdown>
);
