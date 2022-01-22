import React from 'react';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { Posts } from '@/components/Posts';
import firebase from 'firebase/compat';
import DocumentData = firebase.firestore.DocumentData;

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

type Props = {
  posts: DocumentData[];
};
