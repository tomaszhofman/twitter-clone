import React from 'react';
import { TimelinePropIcon } from '@/components/Icons';

function Header() {
  return (
    <header className="flex items-center justify-between h-[53px] xl:px-[15px] sticky top-0.5">
      <h2 className="text-lg font-bold text-white">Home</h2>
      <TimelinePropIcon theme="white" />
    </header>
  );
}

export { Header };
