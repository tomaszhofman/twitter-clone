import { Modal, ModalContent } from '@/components/ui/Modal';

import firebase from 'firebase/compat';
import { firestore } from '../../firebase';
import DocumentData = firebase.firestore.DocumentData;
import { Input } from '@/components/Input';
import { useRecoilState } from 'recoil';
import { currentPostIdAtom } from '../../lib/atoms/currentPostIdAtom';

type Props = {
  posts: DocumentData[];
};

export type DataForHandler = {
  inputValue: string;
};

function ComposeTweet({ posts }: Props) {
  const [postId] = useRecoilState(currentPostIdAtom);
  const post = posts.find((searchedPost) => searchedPost.postId === postId);

  return (
    <div>
      <Modal>
        <ModalContent>
          <div>
            <Input commentMode postToUpdate={post} />
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}

export { ComposeTweet };
