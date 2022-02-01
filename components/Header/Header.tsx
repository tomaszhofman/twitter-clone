import React from 'react';
import { TimelinePropIcon } from '@/components/Icons';
import { useLocale } from '../../lib/hooks/useLocale';

function Header() {
  const { t } = useLocale();
  return (
    <header className="flex items-center justify-between h-[53px] xl:px-[15px] sticky top-0.5">
      <h2 className="text-lg font-bold text-white">{t('home_page_heading')}</h2>
      <TimelinePropIcon theme="white" />
    </header>
  );
}

export { Header };
