import React from 'react';
import { timeFromNowFormater } from '../../../lib/timeFromNowFormater';
import { CardProps } from '../../../lib/types/card';
import Image from 'next/image';

const CardContent = ({
  name,
  tag,
  createdAt,
  text,
  image,
}: Pick<CardProps, 'name' | 'tag' | 'createdAt' | 'text' | 'image'>) => (
  <div>
    <div className="flex items-center gap-[5px] ">
      <div className="font-bold text-sm text-gray-primary"> {name}</div>
      <div className="text-sm text-[#6E767D]">@{tag}</div>
      <div className="text-[#6E767D]">&#183;</div>
      <div className="text-sm text-[#6E767D]">{timeFromNowFormater(createdAt)}</div>
    </div>
    <div className="text-gray-primary text-sm">{text}</div>
    {image && (
      <div className="">
        <div className="relative max-h-[510px] w-full">
          <Image src={image} width={1000} height={1000} objectFit="contain" alt="Brand logo" />
        </div>
      </div>
    )}
  </div>
);

export { CardContent };
