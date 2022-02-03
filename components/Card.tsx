import { timeFromNowFormater } from '../lib/timeFromNowFormater';
import { LikeIconAnimation, replyIcon, retweetIcon, shareIcon } from '@/components/Icons';
import { Button } from '@/components/Button';
import React from 'react';
import { Avatar } from '@/components/Avatar';
import { useDisabled } from '../lib/hooks/useDisabled';

type Props = {
  userImage: string;
  name: string;
  tag: string;
  createdAt: number;
  text: string;
  numberOfLikes: number;
  numberOfReplies: number;
  isLikedByCurrentUser: boolean;
  onDelete?: () => void;
  onReply: () => void;
  onLike: () => void;
};

const Card = (props: Props) => {
  const {
    userImage,
    name,
    tag,
    createdAt,
    text,
    numberOfLikes,
    numberOfReplies,
    isLikedByCurrentUser,
    onDelete,
    onReply,
    onLike,
  } = props;
  const { getDisabledProps } = useDisabled();

  return (
    <div className="flex pt-[10px] px-[15px] items-center min-h-[98px] border-b-[1px] border-[#2f3336]">
      <div className="flex items-start w-full h-full">
        <div className="mr-2">
          <Avatar alt={name} userImage={userImage} />
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
              <div onClick={onReply} className="relative h-full ">
                {replyIcon}
                <span className="icon" />
              </div>
              <div className="text-[#6E767D] text-xs ml-[3px] min-w-[30px] text-center">
                {numberOfReplies !== 0 && numberOfReplies}
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
                  onClick: onLike,
                })}
              >
                <LikeIconAnimation check={isLikedByCurrentUser} isLiked={isLikedByCurrentUser} />
              </Button>
              <div className="text-[#6E767D] text-xs ml-[3px] min-w-[30px] text-center">
                {numberOfLikes !== 0 && numberOfLikes}
              </div>
            </div>
            <div className="flex items-center">
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <div onClick={onDelete} className="relative h-full ">
                {shareIcon}
                <span className="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Card };
