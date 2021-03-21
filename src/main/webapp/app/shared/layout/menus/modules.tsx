import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';

export const ModuleMenu = ({ button }) => (
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
      <div style={{ display: 'flex' }}>{button}</div>

      <div style={{ paddingTop: 30, paddingBottom: 30 }}>
        <Link
          to="/entity/event"
          onClick={() => {
            button.props.onClick();
          }}
        >
          <div style={{ height: 50, width: '100%', padding: '0px 18px', color: 'white' }}>
            <FontAwesomeIcon icon="user" />
            Event
          </div>
        </Link>
      </div>
    </div>
  </div>
);

export default ModuleMenu;
