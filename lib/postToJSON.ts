import firebase from 'firebase/compat';
import DocumentData = firebase.firestore.DocumentData;

export function postToJSON(doc: DocumentData) {
  const data = doc.data();
  return {
    ...data,
    updatedAt: data.createdAt.toMillis(),
    createdAt: data.updatedAt.toMillis(),
  };
}
