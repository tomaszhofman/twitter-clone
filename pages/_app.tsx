import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import { appWithTranslation } from 'next-i18next';
import { I18nLanguageHandler } from '@/components/I18nLanguageHandler';
import { UploadFileProvider } from '../lib/context/fileUploadContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <I18nLanguageHandler />
      <UploadFileProvider>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </UploadFileProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
