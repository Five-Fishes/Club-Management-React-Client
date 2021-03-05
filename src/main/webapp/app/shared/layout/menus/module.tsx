import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const ModuleMenu = ({ isAuthenticated = false }) =>
  isAuthenticated && (
    <NavDropdown icon="user" name={translate('global.menu.account.main')} id="account-menu">
      <MenuItem id="event-item" icon="sign-in-alt" to="/entity/event">
        <Translate contentKey="global.menu.module.event">Event</Translate>
      </MenuItem>
    </NavDropdown>
  );

export default ModuleMenu;
