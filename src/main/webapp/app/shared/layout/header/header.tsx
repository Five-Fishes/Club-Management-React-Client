import './header.scss';

import React from 'react';
import { Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, Button } from 'reactstrap';

import LoadingBar from 'react-redux-loading-bar';

import { Brand } from './header-components';
import { AccountMenu, LocaleMenu } from '../menus';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
          <Brand />
          <Nav id="header-tabs" className="ml-auto">
            <LocaleMenu currentLocale={currentLocale} onClick={this.handleLocaleChange} />
            {isAuthenticated ? (
              <div>avatar image</div>
            ) : (
              <Link to="/auth/login">
                <Button color="primary">
                  <FontAwesomeIcon icon="sign-in-alt" className="mr-2" />
                  <span className="d-none d-md-inline">Sign In</span>
                </Button>
              </Link>
            )}
          </Nav>
        </Navbar>
      </div>
    );
  }
}
