import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/event">
      <Translate contentKey="global.menu.entities.event" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/event-crew">
      <Translate contentKey="global.menu.entities.eventCrew" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/event-attendee">
      <Translate contentKey="global.menu.entities.eventAttendee" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/budget">
      <Translate contentKey="global.menu.entities.budget" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/event-activity">
      <Translate contentKey="global.menu.entities.eventActivity" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/event-checklist">
      <Translate contentKey="global.menu.entities.eventChecklist" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/transaction">
      <Translate contentKey="global.menu.entities.transaction" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/claim">
      <Translate contentKey="global.menu.entities.claim" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/debt">
      <Translate contentKey="global.menu.entities.debt" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/administrator">
      <Translate contentKey="global.menu.entities.administrator" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/club-family">
      <Translate contentKey="global.menu.entities.clubFamily" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/user-cc-info">
      <Translate contentKey="global.menu.entities.userCcInfo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/user-uni-info">
      <Translate contentKey="global.menu.entities.userUniInfo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/faculty">
      <Translate contentKey="global.menu.entities.faculty" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
