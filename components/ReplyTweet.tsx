import { Modal, ModalContent } from '@/components/ui/Modal';

import firebase from 'firebase/compat';
import { firestore } from '../firebase';
import DocumentData = firebase.firestore.DocumentData;
import { useRecoilState } from 'recoil';
import { currentPostIdAtom } from '../lib/atoms/currentPostIdAtom';
import { ComposeForm } from '@/components/ComposeForm';
import { Avatar } from '@/components/Avatar';
import { CardContent } from '@/components/ui';
import React from 'react';
import { addDoc, collection, Timestamp } from '@firebase/firestore';

type Props = {
  posts: DocumentData[];
};

export type DataForHandler = {
  inputValue: string;
};

function ReplayTweet({ posts }: Props) {
  const [postId] = useRecoilState(currentPostIdAtom);
  const post = posts.find((searchedPost) => searchedPost.postId === postId);

  const addReplyHandler = async (data: string) => {
    const repliesRef = collection(firestore, 'posts', post.postId, 'replies');

    await addDoc(repliesRef, {
      repliedTo: post.postId,
      createdBy: post.id,
      name: post.name,
      userImage: post.userImage,
      text: data,
      likes: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  };

  return (
    <div>
      <Modal>
        <ModalContent>
          <div className="flex flex-col justify-between ">
            {post && (
              <div className="flex items-start">
                <div className="mr-2 h-14 flex flex-col ">
                  <Avatar alt={post.name} userImage={post.userImage} />
                  <div className="m-2 flex-1 bg-[#CFD9DE] w-[2px]" />
                </div>
                <div className="flex pb-[10px] flex-col ">
                  <CardContent
                    name={post.name}
                    createdAt={post.createdAt}
                    tag={post.tag}
                    text={post.text}
                  />
                </div>
              </div>
            )}
            <ComposeForm onSubmit={addReplyHandler} />
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

export { ReplayTweet };
