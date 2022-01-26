import React from 'react';

import { DocumentData } from '@firebase/firestore-types';
import { Post } from '@/components/Post';

type Props = {
  posts: DocumentData[];
};

function Posts({ posts }: Props) {
  return (
    <div className="">
      {posts.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </div>
  );
}

export { Posts };
