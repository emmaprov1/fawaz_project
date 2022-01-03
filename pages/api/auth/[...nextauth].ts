import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import UserSchema from '../../../models/user';
import { correctPassword } from '../../../utils/authHandler';
import { connectToDatabase } from '../../../utils/db';
import { pattern } from '../../../utils/homeHandlers';

export default NextAuth({
  session: {
    maxAge: 60 * 60 * 24 * 7,
  },
  secret: process.env.SECRET,
  // callbacks: {
  //   jwt({ token, user, account, profile, isNewUser }) {
  //     console.log(token, user, account, profile);
  //     // if (account) {
  //     //   token.accessToken = account.access_token;
  //     // }
  //     return token;
  //   },
  //   session({ session, token, user }) {
  //     console.log('session', token, user, session);
  //     session.accessToken = token.accessToken;
  //     return session;
  //   },
  // },
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: { email: string; password: string }) {
        const { email, password } = credentials;

        if (!email || !password)
          throw new Error('please input email/username and password');
        if (!pattern.test(email)) throw new Error('invalid email');

        const { db } = await connectToDatabase();

        const user = await db
          .collection('users')
          .findOne({ email, active: true });

        // 2) Check if user exists && password is correct
        if (!user || !(await correctPassword(password, user.password)))
          throw new Error('incorrect email/username or password');

        const strUSer: UserSchema = JSON.parse(JSON.stringify(user));

        // 3) If everything ok, send token to client
        const newUser = {
          email: strUSer._id,
          image: strUSer.type,
        };

        return newUser;
      },
    }),
  ],
});
