import { getProviders, signIn } from 'next-auth/react';
import { InferGetServerSidePropsType } from 'next';

const Login = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="text-white">
      {Object.values(providers).map((provider) => (
        <button key={provider.id} onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
          {provider.name}
        </button>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default Login;
