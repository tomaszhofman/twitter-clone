import React from 'react';
import { TimelinePropIcon } from '@/components/Icons';

function Header({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between h-[53px] xl:px-[15px] sticky -top-0.5 z-10 backdrop-blur-[2px] backdrop-saturate-100">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <TimelinePropIcon theme="white" />
    </header>
  );
}

export { Header };
