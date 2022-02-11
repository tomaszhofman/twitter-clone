import React from 'react';
import { Header } from '@/components/Header';
import { Posts } from '@/components/Posts';
import firebase from 'firebase/compat';
import DocumentData = firebase.firestore.DocumentData;

import { AddTweet } from '@/components/AddTweet';
import { useLocale } from '../../lib/hooks/useLocale';

// const Input = dynamic<InputProps>(() => import('@/components/Input').then((mod) => mod.Input));

export type Props = {
  posts: DocumentData[];
};

function Feed({ posts }: Props) {
  const { t } = useLocale();
  return (
    <div className="flex-1 xl: max-w-[600px] ">
      <Header title={t('home_page_heading')} />
      <AddTweet />
      {/*<Input />*/}
      <Posts posts={posts} />
    </div>
  );
}

export { Feed };
