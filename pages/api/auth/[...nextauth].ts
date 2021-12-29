import NextAuth from 'next-auth';
import Provider from 'next-auth/providers';
import { userType } from '../../../models/user';
import { correctPassword } from '../../../utils/authHandler';
import { connectToDatabase } from '../../../utils/db';
import { pattern } from '../../../utils/homeHandlers';

export default NextAuth({
  session: {
    jwt: true,
    maxAge: 60 * 60 * 24 * 7,
  },
  secret: process.env.SECRET,

  providers: [
    // Provider.Google({}),
    Provider.Credentials({
      async authorize(credentials: { email: string; password: string }) {
        const { email, password } = credentials;

        // 1) Check if email/username and password exist
        if (!email || !password)
          throw new Error('please input email/username and password');

        const { db } = await connectToDatabase();
        let user: any;

        if (pattern.test(email)) {
          user = await db.collection('users').findOne({ email, active: true });
        } else {
          user = await db
            .collection('users')
            .findOne({ username: email, active: true });
        }

        // 2) Check if user exists && password is correct
        if (!user || !(await correctPassword(password, user.password)))
          throw new Error('incorrect email/username or password');

        let errorMsg =
          'your account has not been verified check your email and verify your account';

        if (user.type === userType.Hospital)
          errorMsg = "we'll send you an email once we verify your account";

        if (!user.verified) throw new Error(errorMsg);

        // 3) If everything ok, send token to client
        const newUser = {
          email: user._id,
        };

        return newUser;
      },
    }),
  ],
});
