import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Sidebar } from '@/components/Sidebar';
import { Feed } from '@/components/Feed/Feed';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex bg-black min-h-screen mx-auto my-0 max-w-screen-xl ">
        <Sidebar />
        <Feed />
        {/*<Modal/>*/}
      </main>
    </div>
  );
};

export default Home;
