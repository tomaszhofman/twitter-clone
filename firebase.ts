import { initializeApp } from 'firebase/app';
import { getStorage } from '@firebase/storage';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_GOOGLE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_GOOGLE_MESSAGING_SENDER,
  appId: process.env.NEXT_PUBLIC_GOOGLE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_GOOGLE_MESUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
