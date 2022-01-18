import React from 'react';
import { Icon } from '@/components/Icon';

function Header() {
  return (
    <header className="flex items-center justify-between h-[53px] xl:px-[15px] sticky top-0.5">
      <h2 className="text-lg font-bold text-white">Home</h2>
      <Icon name="timelineOptions" className="h-7" />
    </header>
  );
}

export { Header };
