import { Card } from '@/components/ui/Card/Card';
import { useSession } from 'next-auth/react';
import { deleteDoc, doc, increment, writeBatch } from '@firebase/firestore';
import { firestore } from '../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { currentPostIdAtom } from '../lib/atoms/currentPostIdAtom';

const Tweet = ({ post }) => {
  const { data: session, status } = useSession();
  const loadingUserSession = status === 'loading';
  const userId = !loadingUserSession && session?.user?.id;
  const router = useRouter();
  const [, setPostId] = useRecoilState(currentPostIdAtom);

  const postLikedByReference = doc(firestore, 'posts', post.postId, 'likes', String(userId));
  const realtimePostReference = doc(firestore, 'posts', post.postId);

  const [postLikedBy, postLikedByLoading] = useDocumentData(postLikedByReference);
  const [realtimePost, realtimePostLoading] = useDocumentData(realtimePostReference);

  const isLikedByCurrentUser =
    !postLikedByLoading && postLikedBy?.username?.localeCompare(session?.user?.id) === 0;
  const postLikes = (!realtimePostLoading && realtimePost?.likes) || post.likes;
  const numberOfReplies = 13;

  const openModal = async () => {
    await router.push(
      {
        pathname: router.pathname,
        query: {
          compose: 'tweet',
        },
      },
      undefined,
      { shallow: false },
    );

    setPostId(post.postId);
  };

  const onLikeHandler = async () => {
    const batch = writeBatch(firestore);

    if (isLikedByCurrentUser && postLikes > 0) {
      batch.delete(postLikedByReference);
      batch.update(realtimePostReference, {
        likes: increment(-1),
      });
    } else {
      batch.set(postLikedByReference, {
        username: userId,
      });
      batch.update(realtimePostReference, {
        likes: increment(1),
      });
    }
    await batch.commit();
  };

  const onReplyHandler = async () => {
    await openModal();
  };

  const onDeleteHandler = async () => {
    await deleteDoc(realtimePostReference);
  };

  return (
    <Card
      {...post}
      onLike={onLikeHandler}
      onDelete={onDeleteHandler}
      onReply={onReplyHandler}
      isLikedByCurrentUser={isLikedByCurrentUser}
      numberOfLikes={postLikes}
      numberOfReplies={numberOfReplies}
    />
  );
};

export { Tweet };
