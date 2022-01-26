import Image from 'next/image';
import { timeFromNowFormater } from '../../lib/timeFromNowFormater';
import { likeIcon, replyIcon, retweetIcon, shareIcon } from '@/components/Icons';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

import { doc, increment, writeBatch } from '@firebase/firestore';

import { firestore } from '../../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';

function Post(props) {
  const { createdAt, id, postId, name, tag, text, userImage, likes = 0 } = props.post;

  const postsLikesRef = doc(firestore, 'posts', postId, 'likes', id);
  const postRef = doc(firestore, 'posts', postId);

  const { data: { user } = { user: null } } = useSession();
  const [realtimePost] = useDocumentData(postRef);
  const [liked, setLiked] = useState<boolean>(false);
  const [countLikes, setCountLikes] = useState<number>(realtimePost?.likes || likes);

  const likePostHandler = async () => {
    const batch = writeBatch(firestore);
    // await setDoc(postsLikesRef, {
    //   username: user.id,
    // });

    if (liked) {
      batch.delete(postsLikesRef);
      batch.update(postRef, {
        likes: increment(-1),
      });
      setCountLikes((prevState) => prevState - 1);
    } else {
      batch.set(postsLikesRef, {
        username: user.id,
      });
      batch.update(postRef, {
        likes: increment(1),
      });
      setCountLikes((prevState) => prevState + 1);
    }
    await batch.commit();
    setLiked(!liked);
  };

  return (
    <div
      className="flex pt-[10px] px-[15px] items-center min-h-[98px] border-b-[1px] border-[#2f3336]"
      key={text}
    >
      <div className="flex items-start w-full h-full">
        <div className="mr-2">
          <div className="relative h-[3.063rem] w-[3.063rem]">
            <Image
              src={userImage}
              layout="fill"
              objectFit="cover"
              className="absolute rounded-full "
              alt={name}
            />
          </div>
        </div>
        <div className="flex pb-[10px] flex-col  w-full">
          <div>
            <div className="flex items-center gap-[5px] ">
              <div className="font-bold text-sm text-gray-primary"> {name}</div>
              <div className="text-sm text-[#6E767D]">@{tag}</div>
              <div className="text-[#6E767D]">&#183;</div>
              <div className="text-sm text-[#6E767D]">{timeFromNowFormater(createdAt)}</div>
            </div>
            <div className="text-gray-primary text-sm">{text}</div>
          </div>
          <div className="flex w-full items-center justify-between mt-2">
            <div className="flex items-center">
              <div className="relative h-full ">
                {replyIcon}
                <span className="icon" />
              </div>
              <div className="text-[#6E767D] text-xs ml-[3px] min-w-[30px] text-center">40</div>
            </div>
            <div className="flex items-center">
              <div className="relative h-full ">
                {retweetIcon}
                <span className="icon" />
              </div>
              <div className="text-[#6E767D] text-xs ml-[3px] min-w-[30px] text-center">40</div>
            </div>
            <div className="flex items-center">
              <div
                role="button"
                aria-label="like post"
                tabIndex={0}
                onKeyDown={likePostHandler}
                onClick={likePostHandler}
                className="relative h-full "
              >
                {likeIcon}
                <span className="icon" />
              </div>
              <div className="text-[#6E767D] text-xs ml-[3px] min-w-[30px] text-center">
                {countLikes}
              </div>
            </div>
            <div className="flex items-center">
              <div className="relative h-full ">
                {shareIcon}
                <span className="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Post };
