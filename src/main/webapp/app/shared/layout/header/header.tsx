import './header.scss';

import React from 'react';
import { Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, Button } from 'reactstrap';

import LoadingBar from 'react-redux-loading-bar';

import { Brand } from './header-components';
import { AccountMenu, LocaleMenu, ModuleMenu } from '../menus';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IHeaderProps {
  isAuthenticated: boolean;
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
    const { currentLocale, isAuthenticated, isSwaggerEnabled } = this.props;

    const btn = (
      <Button outline color="primary" aria-label="Menu" onClick={this.toggleMenu} style={{ background: 'white' }}>
        <FontAwesomeIcon icon="bars" />
      </Button>
    );

    /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

    return (
      <div id="app-header">
        <LoadingBar className="loading-bar" />
        <Navbar dark className="h-100">
          {isAuthenticated && btn}
          <Brand />
          <Nav id="header-tabs" className="h-100 ml-auto">
            <LocaleMenu currentLocale={currentLocale} onClick={this.handleLocaleChange} />
            {isAuthenticated ? (
              <Link to="/profile" className="h-100 p-1">
                <img
                  className="mh-100 border rounded-circle shadow"
                  src="content/images/jhipster_family_member_0_head-192.png"
                  alt="avatar"
                />
              </Link>
            ) : (
              <Link className="my-auto" to="/auth/login">
                <Button color="primary">
                  <FontAwesomeIcon icon="user" />
                  <span className="d-none d-md-inline ml-2">Sign In</span>
                </Button>
              </Link>
            )}
          </Nav>
        </Navbar>
        {this.state.menuOpen && <ModuleMenu button={btn} />}
      </div>
    );
  }
}
