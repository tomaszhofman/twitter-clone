import React, { memo } from 'react';

const Avatar = memo(
  ({ userImage, alt, loading }: { userImage: string; alt: string; loading?: boolean }) => {
    return (
      <div className="relative h-[3.063rem] w-[3.063rem] ">
        {loading ? (
          <span className="text-white">loading</span>
        ) : (
          <img src={userImage} className="absolute rounded-full " alt={alt} />
        )}
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';
export { Avatar };
