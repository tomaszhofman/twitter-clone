import React from 'react';
import { Header } from '@/components/Header';
import { Posts } from '@/components/Posts';
import firebase from 'firebase/compat';
import DocumentData = firebase.firestore.DocumentData;
import dynamic from 'next/dynamic';
import { InputProps } from '@/components/Input';

const Input = dynamic<InputProps>(() => import('@/components/Input').then((mod) => mod.Input));

export type Props = {
  posts: DocumentData[];
};

function Feed({ posts }: Props) {
  return (
    <div className="flex-1 xl: max-w-[600px] ">
      <Header />
      <Input />
      <Posts posts={posts} />
    </div>
  );
}

export { Feed };
