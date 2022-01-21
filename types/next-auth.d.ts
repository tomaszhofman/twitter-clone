// import { Session, User } from 'next-auth';
import { DefaultSession } from 'next-auth';

/** Example on how to extend the built-in session types */
declare module 'next-auth' {
  type DefaultSessionUser = NonNullable<DefaultSession['user']>;
  type TwitterSessionUser = DefaultSessionUser & { id: string; tag: string };

  interface Session {
    /** This is an example. You can find me in types/next-auth.d.ts */
    user: TwitterSessionUser;
  }

  // interface User {
  //   /** This is an example. You can find me in types/next-auth.d.ts */
  //   id: string;
  //   tag: string;
  // }
}
