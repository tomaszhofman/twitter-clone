import Head from 'next/head';
import dynamic from 'next/dynamic';
import { TrendingView } from '@/components/widget-sidebar/TrendingView';
import firebase from 'firebase/compat';
import DocumentData = firebase.firestore.DocumentData;

const Sidebar = dynamic(() => import('@/components/Sidebar').then((mod) => mod.Sidebar));

type Props = {
  children: React.ReactNode;
  trendingList: DocumentData[];
};

const Shell = ({ children, trendingList }: Props) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex bg-black min-h-screen mx-auto my-0 max-w-screen-xl ">
        <Sidebar />
        {children}
        <TrendingView trendingList={trendingList} />
      </main>
    </div>
  );
};

export { Shell };
