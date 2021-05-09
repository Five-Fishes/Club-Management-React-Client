import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { LocationDescriptor } from 'history';
import './modules.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IModule {
  moduleName: string;
  iconName: IconProp;
  path: LocationDescriptor<any>;
  sideNavToggler: React.MouseEventHandler<HTMLAnchorElement>;
}

export const Module: React.FC<IModule> = ({ moduleName, iconName, path, sideNavToggler }) => (
  <Link to={path} onClick={sideNavToggler}>
    <div className="module">
      <FontAwesomeIcon icon={iconName} className="module-icon" />
      {moduleName}
    </div>
  </Link>
);

interface IModuleMenu {
  button: React.ReactElement;
}

export const ModuleMenu: React.FC<IModuleMenu> = ({ button }) => {
  function handler(): void {
    button.props.onClick();
  }
  return (
    <div className="h-100 side-nav-base">
      <div className="side-nav-gray-mask" onClick={handler} />
      <div className="side-nav-body">
        <div style={{ display: 'flex' }}>{button}</div>
        <div style={{ paddingTop: 30, paddingBottom: 30 }}>
          <Module moduleName="Event" iconName="plane-departure" path="/entity/event" sideNavToggler={handler} />
          <Module moduleName="Finance" iconName="euro-sign" path="/entity/debt" sideNavToggler={handler} />
        </div>
      </div>
    </div>
  );
};

export default ModuleMenu;
