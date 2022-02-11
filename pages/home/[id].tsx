import { Shell } from '@/components/Shell';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Header } from '@/components/Header';
import { useLocale } from '../../lib/hooks/useLocale';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { collection, doc, getDoc, getDocs } from '@firebase/firestore';
import { firestore } from '../../firebase';
import { postToJSON } from '../../lib/postToJSON';
import { Avatar } from '@/components/Avatar';
import { Card, CardFooter } from '@/components/ui';
import Image from 'next/image';
import React from 'react';

const ReplyPage = ({
  replies,
  postDetails,
  trendingList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { name, tag, text, userImage, image } = postDetails;
  const { t } = useLocale();

  return (
    <Shell trendingList={trendingList}>
      <div className="flex-1 xl: max-w-[600px]">
        <Header title={t('tweet_details_title')} />
        <div className="p-4 ">
          <div className="flex">
            <Avatar userImage={userImage} alt={name} />
            <div className="ml-[12px]">
              <h2 className="text-white">{name}</h2>
              <span className="text-white text-sm ">@{tag}</span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-white text-md">{text}</p>
            {image && (
              <div className="">
                <div className="relative max-h-[1000px] w-[1000px] rounded-full ">
                  <Image
                    placeholder="blur"
                    src={image}
                    layout="fill" // required
                    objectFit="cover" // change to suit your needs
                    className="" // just an example
                    alt="Brand logo"
                    blurDataURL={
                      'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAbEAADAAMBAQAAAAAAAAAAAAABAgMABAURUf/EABUBAQEAAAAAAAAAAAAAAAAAAAIF/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8AntO30Y6vPiu0zzlpwnMVAoVUTACgsCfB8xjGT6iW9aBiP//Z'
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <CardFooter
            numberOfLikes={13}
            numberOfReplies={13}
            isLikedByCurrentUser={true}
            onReply={() => {}}
            onLike={() => {}}
          />
        </div>

        {replies.map((reply) => (
          <Card key={reply.text} {...reply} />
        ))}
      </div>
    </Shell>
  );
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { id } = params;

  const postDetailsRef = doc(firestore, 'posts', id as string);
  const collectionRef = collection(firestore, 'posts', id as string, 'replies');
  const userDoc = await getDocs(collectionRef);
  const postDetails = postToJSON(await getDoc(postDetailsRef));
  const replies = userDoc.docs.map(postToJSON);

  const trendingRef = collection(firestore, 'trending');
  const trendingDocs = await getDocs(trendingRef);
  const trendingList = trendingDocs.docs.map((el) => el.data());

  return {
    props: {
      replies,
      postDetails,
      trendingList,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export async function getStaticPaths() {
  const collectionRef = collection(firestore, 'posts');
  const snapshot = await getDocs(collectionRef);

  const paths = snapshot.docs.map((snapShotDoc) => {
    const id = snapShotDoc.id;

    return {
      params: { id },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export default ReplyPage;
