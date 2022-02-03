import NextAuth, { Session } from 'next-auth';
import { Provider } from 'next-auth/providers';
import GoogleProvider from 'next-auth/providers/google';
import { doc, setDoc } from '@firebase/firestore';
import { firestore } from '../../../firebase';

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  }),
];

export default NextAuth({
  providers,
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      const twitterSession: Session = {
        ...session,
        user: {
          ...session.user,
          tag: session.user.name.split(' ').join('').toLowerCase(),
          id: token.sub,
        },
      };
      return twitterSession;
    },
    async signIn({ user, account }) {
      const userDoc = doc(firestore, 'users', user.id);
      await setDoc(userDoc, {
        username: user.name.split(' ').join('').toLowerCase(),
        name: user.name,
        email: user.email,
        identityProvider: account.provider,
        bio: '',
        locale: '',
      });

      //TODO: check if user exists in database
      return true;
    },
  },
});
