import { useSession } from 'next-auth/react';
import React, { useRef, useState } from 'react';
import { Avatar } from '@/components/Avatar';
import { useLocale } from '../lib/hooks/useLocale';
import { emojiIcon, gifIcon, mediaIcon, surveyIcon } from '@/components/Icons';
import { AutoHeightTextField } from '@/components/AutoHeightTextField';
import { useGlobalFileUpload } from '../lib/context/fileUploadContext';

type Props = {
  onSubmit: (data: string) => Promise<void>;
};

const ComposeForm = ({ onSubmit }: Props) => {
  const { data: session, status } = useSession();
  const { t } = useLocale();
  const [value, setValue] = useState<string>('');
  const filePickerRef = useRef(null);

  const [{ resultFile, reset }, setFile] = useGlobalFileUpload();

  const loading = status === 'loading';
  const user = session?.user;

  const onSubmitHandler = async () => {
    await onSubmit(value);
    setValue('');
    reset();
  };

  return (
    <div className="w-full border-b border-[#2F3336] p-3 flex items-start space-x-3 overflow-y-scroll ">
      <Avatar userImage={user?.image} alt={user?.tag} loading={loading} />
      <div className="pt-2 w-full">
        <div className="divide-y divide-[#2F3336] text-[#8899A6]">
          <AutoHeightTextField
            name="compose-tweet"
            value={value}
            placeholder={t('new_tweet_placeholder')}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
            onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) =>
              setValue(e.currentTarget.textContent)
            }
          />

          {Boolean(resultFile) && (
            <div className="relative">
              <div
                className={`h-min max-w-full
             object-contain`}
              >
                <img src={String(resultFile)} className="rounded-2xl h-full w-full" alt={''} />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center ">
              <div>
                <div
                  tabIndex={0}
                  role="button"
                  aria-label="add photos or video"
                  onClick={() => filePickerRef.current.click()}
                  onKeyDown={() => filePickerRef.current.click()}
                  className="relative mr-[10px] "
                >
                  {mediaIcon}
                  <span className="icon" />
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                  ref={filePickerRef}
                />
              </div>
              <div className="relative h-full  mx-[10px] ">
                {gifIcon}
                <span className="icon" />
              </div>
              <div className="relative h-full  mx-[10px] ">
                {surveyIcon}
                <span className="icon" />
              </div>
              {/*<div*/}
              {/*  onClick={() => setShowEmoji(!showEmoji)}*/}
              {/*  onKeyDown={() => setShowEmoji(!showEmoji)}*/}
              {/*  role="button"*/}
              {/*  tabIndex={0}*/}
              {/*  aria-label="add emoji"*/}
              {/*  className="relative h-full mx-[10px]"*/}
              {/*>*/}
              {emojiIcon}
              <span className="icon" />
            </div>
            {/*{showEmoji && (*/}
            {/*  <Picker*/}
            {/*    onSelect={addEmojiHandler}*/}
            {/*    style={{*/}
            {/*      position: 'absolute',*/}
            {/*      marginTop: '465px',*/}
            {/*      marginLeft: -40,*/}
            {/*      maxWidth: '320px',*/}
            {/*      borderRadius: '20px',*/}
            {/*    }}*/}
            {/*    theme="dark"*/}
            {/*    backgroundImageFn={(set, sheetSize) =>*/}
            {/*      `https://unpkg.com/emoji-datasource-apple@6.0.1/img/${set}/sheets-256/${sheetSize}.png`*/}
            {/*    }*/}
            {/*  />*/}
            {/*)}*/}

            <button
              className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
              disabled={!value.trim() && !resultFile}
              onClick={onSubmitHandler}
            >
              tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ComposeForm };
