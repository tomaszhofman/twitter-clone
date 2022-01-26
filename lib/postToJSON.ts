import firebase from 'firebase/compat';
import DocumentData = firebase.firestore.DocumentData;

export function postToJSON(doc: DocumentData) {
  const postId = doc.id;
  const data = doc.data();
  return {
    ...data,
    postId,
    updatedAt: data.createdAt.toMillis(),
    createdAt: data.updatedAt.toMillis(),
  };
}
