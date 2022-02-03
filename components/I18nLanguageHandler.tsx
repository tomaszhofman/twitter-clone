import { useLocale } from 'lib/hooks/useLocale';
import { useSession } from 'next-auth/react';

import { firestore } from '../firebase';
import { doc, getDoc } from '@firebase/firestore';

import { useEffect, useState } from 'react';

const I18nLanguageHandler = (): null => {
  const { i18n } = useLocale();
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [locale, setLocale] = useState('');

  const getUserDetails = async () => {
    const userRef = doc(firestore, 'users', session.user.id);
    const userDocs = await getDoc(userRef);
    const { locale: dbUserLanguage } = userDocs.data();
    setLocale(dbUserLanguage);
  };

  useEffect(() => {
    if (locale && i18n.language && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [i18n, locale]);

  if (!loading && session) {
    getUserDetails();
  }
  return null;
};

export { I18nLanguageHandler };
