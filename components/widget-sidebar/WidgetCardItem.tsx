import React from 'react';

const formatNumber = (number: number) => {
  return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number);
};

const WidgetCardItem = ({ heading, numberOfLikes = 14000 }) => {
  return (
    <div className="h-[62px] m-[15px] ">
      <p className="text-xs text-[#6E767D]">Trading in Poland</p>
      <p className="font-bold text-[#6E767] text-white">{heading}</p>
      <span className="text-xs text-[#6E767D]">{formatNumber(numberOfLikes)} Tweets</span>
    </div>
  );
};

export { WidgetCardItem };
