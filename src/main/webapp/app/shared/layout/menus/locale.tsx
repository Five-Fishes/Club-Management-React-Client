import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavDropdown } from './menu-components';
import { locales, languages } from 'app/config/translation';

interface ILocaleMenu {
  currentLocale?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const LocaleMenu: React.FC<ILocaleMenu> = ({ currentLocale, onClick }) => {
  if (Object.keys(languages).length <= 1) return null;
  if (!currentLocale) return null;
  return (
    <NavDropdown icon="globe" name={languages[currentLocale]?.name}>
      {locales.map(locale => (
        <DropdownItem key={locale} value={locale} onClick={onClick}>
          {languages[locale].name}
        </DropdownItem>
      ))}
    </NavDropdown>
  );
};
