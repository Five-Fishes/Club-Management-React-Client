import './header.scss';

import React from 'react';
import { Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler } from 'reactstrap';

import LoadingBar from 'react-redux-loading-bar';

import { Brand } from './header-components';
import { AccountMenu, LocaleMenu, ModuleMenu } from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

export interface IHeaderState {
  menuOpen: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    this.props.onLocaleChange(langKey);
  };

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const { currentLocale, isAuthenticated, isAdmin, isSwaggerEnabled } = this.props;

    /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

    return (
      <div id="app-header">
        <LoadingBar className="loading-bar" />
        <Navbar dark className="bg-primary">
          {/* <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} /> */}
          <Brand />
          <Nav id="header-tabs" className="ml-auto">
            <ModuleMenu isAuthenticated={isAuthenticated} />
            <LocaleMenu currentLocale={currentLocale} onClick={this.handleLocaleChange} />
            <AccountMenu isAuthenticated={isAuthenticated} />
          </Nav>
        </Navbar>
      </div>
    );
  }
}
