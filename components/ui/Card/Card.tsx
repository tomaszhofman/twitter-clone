import React from 'react';
import { Avatar } from '@/components/Avatar';
import Link from 'next/link';
import { CardProps } from '../../../lib/types/card';
import { CardContent, CardFooter } from '@/components/ui';

const Card = (props: CardProps) => {
  const {
    userImage,
    name,
    tag,
    createdAt,
    text,
    numberOfLikes,
    numberOfReplies,
    isLikedByCurrentUser,
    image,
    onDelete,
    onReply,
    onLike,
  } = props;

  return (
    <Link
      shallow={true}
      passHref={true}
      href={{
        pathname: `/home/${props.postId}`,
      }}
    >
      <div className="flex pt-[10px] px-[15px] items-center min-h-[98px] border-b-[1px] border-[#2f3336]">
        <div className="flex items-start w-full h-full">
          <div className="mr-2">
            <Avatar alt={name} userImage={userImage} />
          </div>
          <div className="flex pb-[10px] flex-col w-full">
            <CardContent image={image} name={name} createdAt={createdAt} tag={tag} text={text} />
            <CardFooter
              numberOfLikes={numberOfLikes}
              numberOfReplies={numberOfReplies}
              isLikedByCurrentUser={isLikedByCurrentUser}
              onReply={onReply}
              onLike={onLike}
              onDelete={onDelete}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export { Card };
