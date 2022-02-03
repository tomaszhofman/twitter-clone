import { pick } from 'accept-language-parser';
import { i18n } from '../next-i18next.config';
import { IncomingMessage } from 'http';

export const getLocaleFromHeaders = (req: IncomingMessage) => {
  let preferredLocale: string | null;

  if (req.headers['accept-language']) {
    preferredLocale = pick(i18n.locales, req.headers['accept-language']);
  }

  return preferredLocale || i18n.defaultLocale;
};
