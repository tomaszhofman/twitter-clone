import React from 'react';
import firebase from 'firebase/compat';
import DocumentData = firebase.firestore.DocumentData;
import { timeFromNowFormater } from '../../lib/timeFromNowFormater';
import Image from 'next/image';

function Posts({ posts }: Props) {
  return (
    <div className="">
      {posts.map((post) => (
        <div
          className="flex py-[10px] px-[15px] items-center min-h-[98px] border-b-[1px] border-[#2f3336]"
          key={post.text}
        >
          <div className="flex items-start w-full h-full ">
            <div className="mr-2">
              <div className="relative h-[3.063rem] w-[3.063rem]">
                <Image
                  src={post.userImage}
                  layout="fill"
                  objectFit="cover"
                  className="absolute rounded-full "
                  alt={post.name}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-[5px]  ">
                <div className="font-bold text-sm text-white"> {post.name}</div>
                <div className="text-sm text-[#6E767D]">@{post.tag}</div>
                <div className="text-[#6E767D]">&#183;</div>
                <div className="text-sm text-[#6E767D]">{timeFromNowFormater(post.createdAt)}</div>
              </div>
              <div className="text-white text-sm">{post.text}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { Posts };

type Props = {
  posts: DocumentData[];
};
