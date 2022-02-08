import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
} from '@firebase/firestore';
import { firestore } from '../firebase';
import { postToJSON } from '../lib/postToJSON';
import { useCollection } from 'react-firebase-hooks/firestore';
import dynamic from 'next/dynamic';
import { Props } from '@/components/Feed';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getLocaleFromHeaders } from '../lib/getLocaleFromHeaders';
import { ReplayTweet } from '@/components/ReplyTweet';
import { Shell } from '@/components/Shell';

const Feed = dynamic<Props>(() => import('@/components/Feed').then((mod) => mod.Feed));

const collectionRef = collectionGroup(firestore, 'posts');
const postsQuery = query(collectionRef, orderBy('createdAt', 'desc'), limit(8));

const Home = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [querySnapshot] = useCollection(postsQuery);
  const realtimePosts = querySnapshot?.docs.map(postToJSON);
  const posts = realtimePosts || props.posts;

  return (
    <Shell>
      <Feed posts={posts} />
      {/*<AddTweet posts={posts} />*/}
      <ReplayTweet posts={posts} />
    </Shell>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });

  const userRef = doc(firestore, 'users', session.user.id);

  const postsDocs = await getDocs(postsQuery);
  const userDocs = await getDoc(userRef);

  const userDoc = userDocs.data();
  const posts = postsDocs.docs.map(postToJSON);

  const locale = userDoc.locale || getLocaleFromHeaders(req);

  if (!userDoc.locale) {
    await updateDoc(userRef, {
      locale,
    });
  }

  if (!session?.user) {
    return { redirect: { permanent: false, destination: '/login' } };
  } else {
    return {
      props: {
        profile: {
          username: session.user.name,
          tag: session.user.tag,
          id: session.user.id,
        },
        posts,

        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  }
}

export default Home;
