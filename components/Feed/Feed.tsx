import React from 'react';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';

function Feed() {
  return (
    <div className="flex-1 xl: max-w-[600px] ">
      <Header />
      <Input />
    </div>
  );
}

export { Feed };
