import React, { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { BaseEmoji, Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { addDoc, collection, doc, updateDoc, Timestamp } from '@firebase/firestore';
import { firestore, storage } from '../../firebase';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { emojiIcon, gifIcon, mediaIcon, surveyIcon } from '@/components/Icons';
import { useSession } from 'next-auth/react';
import { DataForHandler } from '@/components/compose';

// type ImageDimensions = {
//   width: number;
//   height: number;
// };

export type InputProps = {
  onUpdatePost?: (data: DataForHandler) => void;
};

function Input({ onUpdatePost }: InputProps) {
  const { data } = useSession();
  const [inputValue, setInputValue] = useState('');
  const [selectImage, setSelectImage] = useState<string | ArrayBuffer>('');
  const [showEmoji, setShowEmoji] = useState(false);
  // const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({ height: 0, width: 0 });
  const filePickerRef = useRef(null);
  const imageRef = useRef(null);

  const { user } = data || {};
  const canUpdatePost = Boolean(onUpdatePost);

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  // const onImgLoadHandler = () => {
  //   setImageDimensions({
  //     height: imageRef.current.height,
  //     width: imageRef.current.width,
  //   });
  // };

  const addImageToPostHandler = (e: ChangeEvent<HTMLInputElement> & { files: FileList }) => {
    const [file] = Array.from(e.target.files);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (progressEvent) => {
      // loadImage(setImageDimensions, progressEvent.target.result);
      setSelectImage(progressEvent.target.result);
    };
  };

  const addEmojiHandler = (e: BaseEmoji) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInputValue(inputValue + emoji);
  };

  //API HANDLERS
  const sendPostHandler = async () => {
    if (canUpdatePost) {
      const dataForHandler = {
        inputValue,
      };
      onUpdatePost(dataForHandler);
    } else {
      const postsRef = collection(firestore, 'posts');
      const collectionSnap = await addDoc(postsRef, {
        id: user.id,
        userImage: user.image,
        name: user.name,
        tag: user.tag,
        text: inputValue,
        likes: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      const storageImageRef = ref(storage, `posts/${collectionSnap.id}/image`);
      if (selectImage) {
        await uploadString(storageImageRef, String(selectImage), 'data_url');
        const downloadedUrl = await getDownloadURL(storageImageRef);
        await updateDoc(doc(firestore, 'posts', collectionSnap.id), { image: downloadedUrl });
      }
    }
  };

  return (
    <div className="w-full border-b border-[#2F3336] p-3 flex space-x-3 overflow-y-scroll items-start">
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

        {Boolean(selectImage) && (
          <div className="relative">
            <div
              className={`h-min max-w-full
             object-contain`}
            >
              <img
                src={String(selectImage)}
                className="rounded-2xl h-full w-full"
                alt={''}
                ref={imageRef}
                // onLoad={onImgLoadHandler}
              />
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
                onChange={addImageToPostHandler}
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
            <div
              onClick={() => setShowEmoji(!showEmoji)}
              onKeyDown={() => setShowEmoji(!showEmoji)}
              role="button"
              tabIndex={0}
              aria-label="add emoji"
              className="relative h-full mx-[10px]"
            >
              {emojiIcon}
              <span className="icon" />
            </div>
            {showEmoji && (
              <Picker
                onSelect={addEmojiHandler}
                style={{
                  position: 'absolute',
                  marginTop: '465px',
                  marginLeft: -40,
                  maxWidth: '320px',
                  borderRadius: '20px',
                }}
                theme="dark"
                backgroundImageFn={(set, sheetSize) =>
                  `https://unpkg.com/emoji-datasource-apple@6.0.1/img/${set}/sheets-256/${sheetSize}.png`
                }
              />
            )}
          </div>
          <button
            className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
            disabled={!inputValue.trim() && !selectImage}
            onClick={sendPostHandler}
          >
            tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export { Input };
