import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const ModuleMenu = ({ isAuthenticated = false, button }) => (
  <div
    className="h-100"
    style={{
      left: 0,
      top: 0,
      zIndex: 1001,
      height: '100vh',
      width: '100%',
      position: 'fixed'
    }}
  >
    <div
      style={{
        background: 'black',
        opacity: 0.5,
        height: '100vh'
      }}
      onClick={() => {
        button.props.onClick();
      }}
    />
    <div
      style={{
        background: '#07ADE1',
        left: 0,
        top: 0,
        position: 'absolute',
        height: '100vh',
        padding: '12px 16px',
        minWidth: 325,
        maxWidth: 325,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ display: 'flex' }}>
        <div>{button}</div>
      </div>

      <Link
        to="/entity/event"
        onClick={() => {
          button.props.onClick();
        }}
      >
        link
      </Link>
    </div>
  </div>
);

export default ModuleMenu;
