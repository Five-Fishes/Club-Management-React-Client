import React, { CSSProperties } from 'react';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface INavDropdownProps {
  id?: string;
  icon: IconProp;
  name: string;
  style?: CSSProperties;
}

export const NavDropdown: React.FC<INavDropdownProps> = ({ id, icon, name, style, children }) => (
  <UncontrolledDropdown nav inNavbar id={id} className="d-flex">
    <DropdownToggle nav caret className="d-flex align-items-center my-auto">
      <FontAwesomeIcon icon={icon} className="mr-2" />
      <span className="d-none d-md-inline">{name}</span>
    </DropdownToggle>
    <DropdownMenu right style={style}>
      {children}
    </DropdownMenu>
  </UncontrolledDropdown>
);
