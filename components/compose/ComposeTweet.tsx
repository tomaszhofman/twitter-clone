import { Modal, ModalCloseButton, ModalContentBase, ModalOnInitialOpen } from '@/components/Modal';
import { useRouter } from 'next/router';
import firebase from 'firebase/compat';
import { firestore } from '../../firebase';
import DocumentData = firebase.firestore.DocumentData;
import { Input } from '@/components/Input';
import { addDoc, collection, Timestamp } from '@firebase/firestore';

type Props = {
  posts: DocumentData[];
};

export type DataForHandler = {
  inputValue: string;
};

function ComposeTweet({ posts }: Props) {
  const router = useRouter();
  const post = posts.find((searchedPost) => searchedPost.postId === router.query.postId);

  const postIdRef = collection(firestore, 'posts', post?.postId, 'comments');
  // const [data] = useCollection(postIdRef);

  const addCommentHandler = async (dataForHandler: DataForHandler) => {
    await addDoc(postIdRef, {
      comment: dataForHandler.inputValue,
      id: post.id,
      userImage: post.userImage,
      name: post.name,
      tag: post.tag,
      likes: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  };

  return (
    <div>
      <Modal>
        <ModalOnInitialOpen query={router.query} />
        <ModalContentBase>
          <ModalCloseButton>
            <div className="py-2 pb-2 ">
              <span className="cursor-pointer">x</span>
            </div>
          </ModalCloseButton>
          <div>
            <Input onUpdatePost={addCommentHandler} />
          </div>
        </ModalContentBase>
      </Modal>
    </div>
  );
}

export { ComposeTweet };
