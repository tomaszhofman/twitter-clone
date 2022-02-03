import { timeFromNowFormater } from '../../lib/timeFromNowFormater';
import { LikeIconAnimation, replyIcon, retweetIcon, shareIcon } from '@/components/Icons';
import React, { useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { collection, doc, increment, writeBatch } from '@firebase/firestore';
import { firestore } from '../../firebase';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { Button } from '@/components/Button';
import { useDisabled } from '../../lib/hooks/useDisabled';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { currentPostIdAtom } from '../../lib/atoms/currentPostIdAtom';

export const useToggleRouterQuery = (name: string) => {
  const { query } = useRouter();

  const off = useMemo(() => {
    const newQuery = {
      ...query,
    };
    delete newQuery[name];
    return {
      newQuery,
    };
  }, [name, query]);

  const on = useMemo(() => {
    const newQuery = {
      ...query,
      [name]: 'tweet',
    };
    return {
      newQuery,
    };
  }, [name, query]);

  return {
    off,
    on,
    isOn: query[name] === 'tweet',
  };
};

function Post(props) {
  const { createdAt, id, postId, name, tag, text, userImage } = props.post;
  const { data } = useSession();
  const { id: userId } = data?.user || {};
  const { getDisabledProps } = useDisabled();
  const currentUserLikesRef = doc(firestore, 'posts', postId, 'likes', userId || id);
  const postRef = doc(firestore, 'posts', postId);
  const commentsRef = collection(firestore, 'posts', postId, 'comments');
  const [realtimePost] = useDocumentData(postRef);
  const [realtimeComments] = useCollectionData(commentsRef);
  const [realTimePostLikes] = useDocumentData(currentUserLikesRef);
  const [, setPostId] = useRecoilState(currentPostIdAtom);

  const router = useRouter();

  const postComments = (realtimeComments && realtimeComments.length) || 0;
  const postLikes = realtimePost || props.post || 0;
  const isPostLikedByUser = realTimePostLikes?.username?.localeCompare(userId) === 0;

  const likePostHandler = async () => {
    const batch = writeBatch(firestore);

    if (isPostLikedByUser && postLikes.likes > 0) {
      batch.delete(currentUserLikesRef);
      batch.update(postRef, {
        likes: increment(-1),
      });
    } else {
      batch.set(currentUserLikesRef, {
        username: userId,
      });
      batch.update(postRef, {
        likes: increment(1),
      });
    }
    await batch.commit();
  };

  const openModal = async () => {
    await router.push(
      {
        pathname: router.pathname,
        query: {
          compose: 'tweet',
        },
      },
      undefined,
      { shallow: true },
    );
  };

  const addCommentHandler = async () => {
    await openModal();
    setPostId(postId);
  };

  return (
    <div
      className="flex pt-[10px] px-[15px] items-center min-h-[98px] border-b-[1px] border-[#2f3336]"
      key={text}
    >
      <div className="flex items-start w-full h-full">
        <div className="mr-2">
          <div className="relative h-[3.063rem] w-[3.063rem]">
            <img src={userImage} className="absolute rounded-full " alt={name} />
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
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <div onClick={addCommentHandler} className="relative h-full ">
                {replyIcon}
                <span className="icon" />
              </div>
              <div className="text-[#6E767D] text-xs ml-[3px] min-w-[30px] text-center">
                {postComments !== 0 && postComments}
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative h-full ">
                {retweetIcon}
                <span className="icon" />
              </div>
              <div className="text-[#6E767D] text-xs ml-[3px] min-w-[30px] text-center">40</div>
            </div>
            <div className="flex items-center">
              <Button<React.ReactNode>
                ariaLabel={'custom-button'}
                className="relative h-full "
                size={'icon'}
                {...getDisabledProps({
                  onClick: likePostHandler,
                })}
              >
                <LikeIconAnimation check={isPostLikedByUser} isLiked={isPostLikedByUser} />
              </Button>
              <div className="text-[#6E767D] text-xs ml-[3px] min-w-[30px] text-center">
                {postLikes.likes !== 0 && postLikes.likes}
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
