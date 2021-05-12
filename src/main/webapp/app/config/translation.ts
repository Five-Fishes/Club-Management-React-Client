import { TranslatorContext, Storage } from 'react-jhipster';

import { setLocale } from 'app/shared/reducers/locale';
import { Store } from 'redux';

TranslatorContext.setDefaultLocale('en');
TranslatorContext.setRenderInnerTextForMissingKeys(false);

export const languages: any = {
  'zh-cn': { name: '中文（简体）' },
  en: { name: 'English' },
  // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
};

export const locales = Object.keys(languages).sort();

export function registerLocale(store: Store) {
  const locale = Storage.session.get('locale', 'en');
  // @ts-ignore no clue why jhipster write this code
  store.dispatch(setLocale(locale));
}
