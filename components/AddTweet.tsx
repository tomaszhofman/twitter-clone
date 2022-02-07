import { firestore, storage } from '../firebase';
import { ComposeForm } from '@/components/ComposeForm';
import React from 'react';
import { addDoc, collection, doc, Timestamp, updateDoc } from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { useFileUpload } from '../lib/hooks/useFileUpload';
import { useSession } from 'next-auth/react';

export type DataForHandler = {
  inputValue: string;
};

function AddTweet() {
  const [{ resultFile }] = useFileUpload({ method: 'readAsDataURL' });
  const { data: session } = useSession();
  const user = session?.user;

  const createNewTweet = async (data: string) => {
    const postsRef = collection(firestore, 'posts');
    const collectionSnap = await addDoc(postsRef, {
      id: user.id,
      userImage: user.image,
      name: user.name,
      tag: user.tag,
      text: data,
      likes: 0,
      locale: 'pl',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    const storageImageRef = ref(storage, `posts/${collectionSnap.id}/image`);
    if (resultFile) {
      await uploadString(storageImageRef, String(resultFile), 'data_url');
      const downloadedUrl = await getDownloadURL(storageImageRef);
      await updateDoc(doc(firestore, 'posts', collectionSnap.id), { image: downloadedUrl });
    }
  };

  return (
    <div>
      <ComposeForm onSubmit={createNewTweet} />
    </div>
  );
}

export { AddTweet };
