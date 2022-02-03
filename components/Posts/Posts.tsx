import React from 'react';

import { DocumentData } from '@firebase/firestore-types';

import { Tweet } from '@/components/Tweet';

type Props = {
  posts: DocumentData[];
};

function Posts({ posts }: Props) {
  return (
    <div className="">
      {posts.map((post) => (
        // <Post key={post.postId} post={post} />
        <Tweet key={post.postId} post={post} />
      ))}
    </div>
  );
}

export { Posts };
