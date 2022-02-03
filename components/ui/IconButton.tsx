import React from 'react';

const IconButton = ({ icon }: { icon: string }) => (
  <div className="flex items-center">
    <div className="relative h-full ">
      {icon}
      <span className="icon" />
    </div>
    <div className="text-[#6E767D] text-xs ml-[3px] min-w-[30px] text-center">40</div>
  </div>
);

export { IconButton };
