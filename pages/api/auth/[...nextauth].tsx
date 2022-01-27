import NextAuth, { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
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
  },
  secret: process.env.SECRET || '123',
});
