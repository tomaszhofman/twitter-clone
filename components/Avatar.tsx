import React from 'react';

const Avatar = ({ userImage, alt }: { userImage: string; alt: string }) => (
  <div className="relative h-[3.063rem] w-[3.063rem]">
    <img src={userImage} className="absolute rounded-full " alt={alt} />
  </div>
);

export { Avatar };
