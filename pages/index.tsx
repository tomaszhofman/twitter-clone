import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

function RedirectPage() {
  return;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session?.user) {
    return { redirect: { permanent: false, destination: '/login' } };
  } else {
    return { redirect: { permanent: false, destination: '/home' } };
  }
}

export default RedirectPage;
