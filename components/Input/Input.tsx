import React, { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/Icon';
import { IconTypesEnum } from '../../types/iconsTypes';

function Input() {
  const [inputValue, setInputValue] = useState('');
  const filePickerRef = useRef(null);

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const addImageToPostHandler = () => {};
  return (
    <div className="w-full border-b border-[#2F3336] p-3 flex space-x-3 overflow-y-scroll items-center">
      <div>
        <Image
          src="https://pbs.twimg.com/profile_images/1467773673058750468/X-7z8YWX_x96.png"
          alt=""
          width={48}
          height={48}
          className="rounded-full "
        />
      </div>
      <div className="w-full divide-y divide-[#2F3336] text-[#8899A6]">
        <div className="">
          <textarea
            className="resize-none bg-transparent outline-none w-full "
            placeholder="What’s happening?"
            value={inputValue}
            onChange={onChangeHandler}
            name="tweet"
            id="tweet"
          />
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center ">
            <div className="icon">
              <Icon
                onClick={() => filePickerRef.current.click()}
                name="uploadImg"
                className="h-22 "
              />
              <input
                type="file"
                className="hidden"
                onChange={addImageToPostHandler}
                ref={filePickerRef}
              />
            </div>
            <div className="icon">
              <Icon name={IconTypesEnum.Gif} className="h-22 " />
            </div>
            <div className="icon">
              <Icon name={IconTypesEnum.Survey} className="h-22 " />
            </div>
            <div className="icon">
              <Icon name={IconTypesEnum.Emoji} className="h-22 " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Input };
