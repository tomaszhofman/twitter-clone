import React from 'react';
import { LikeIconAnimation, replyIcon, retweetIcon, shareIcon } from '@/components/Icons';
import { useDisabled } from '../../../lib/hooks/useDisabled';
import { CardProps } from '../../../lib/types/card';
import { IconButton } from '@/components/IconButton';

const CardFooter = ({
  numberOfLikes,
  numberOfReplies,
  isLikedByCurrentUser,
  onReply,
  onLike,
}: Omit<CardProps, 'name' | 'tag' | 'createdAt' | 'text' | 'userImage'>) => {
  const { getDisabledProps } = useDisabled();

  return (
    <div className="flex w-full items-center justify-between mt-2">
      <div className="flex items-center">
        <IconButton onClick={onReply} ariaLabel="make a retweet" icon={replyIcon} />
        <div className="text-[#6E767D] text-xs ml-[3px] min-w-[30px] text-center">
          {numberOfReplies !== 0 && numberOfReplies}
        </div>
      </div>

      <div className="flex items-center">
        <IconButton ariaLabel="make a retweet" icon={retweetIcon} />
        <div className="text-[#6E767D] text-xs ml-[3px] min-w-[30px] text-center">40</div>
      </div>
      <div className="flex items-center">
        <IconButton
          onClick={onLike}
          ariaLabel="make a retweet"
          {...getDisabledProps({ onClick: onLike })}
        >
          <LikeIconAnimation check={isLikedByCurrentUser} isLiked={isLikedByCurrentUser} />
        </IconButton>

        <div className="text-[#6E767D] text-xs ml-[3px] min-w-[30px] text-center">
          {numberOfLikes !== 0 && numberOfLikes}
        </div>
      </div>
      <div className="flex items-center">
        <IconButton ariaLabel="make a retweet" icon={shareIcon} />
      </div>
    </div>
  );
};

export { CardFooter };
