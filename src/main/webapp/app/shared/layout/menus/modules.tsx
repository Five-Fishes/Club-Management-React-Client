import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

const accountMenuItemsAuthenticated = (
  <>
    <Link to="/entity/event">link</Link>
  </>
);

const accountMenuItems = (
  <>
    <MenuItem id="login-item" icon="sign-in-alt" to="/login">
      <Translate contentKey="global.menu.account.login">Sign in</Translate>
    </MenuItem>
    <MenuItem icon="sign-in-alt" to="/entity/event">
      <Translate contentKey="global.menu.account.register">Register</Translate>
    </MenuItem>
  </>
);

export const ModuleMenu = ({ isAuthenticated = false, button }) => (
  <div
    className="h-100"
    style={{ height: '100vh', width: '50%', background: 'black', position: 'fixed', left: 0, top: 0, padding: 16, zIndex: 1000 }}
  >
    {button}
    {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
  </div>
);

export default ModuleMenu;
