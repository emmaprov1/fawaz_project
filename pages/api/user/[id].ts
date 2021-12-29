import { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/client';
import UserSchema from '../../../models/user';
import { connectToDatabase } from '../../../utils/db';
import ErrorHandler from '../../../utils/ErrorHandler';
import { ObjectId } from 'mongodb';
import client from 'twilio';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    try {
      // const session = getSession({ req });

      // if (!session) throw new Error('please login');

      const { db } = await connectToDatabase();
      const userId = new ObjectId(req.query.id.toString());

      const user: UserSchema = await db
        .collection('users')
        .findOne({ _id: userId }, { projection: { password: 0 } });

      if (!user) throw new Error('user with this account does not exist');

      if (!user.active) throw new Error('this account has been deleted');

      try {
        await client(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_AUTH_TOKEN
        ).messages.create({
          body: `this is your verification token ${user.verifyToken}`,
          from: '+14405538509',
          to: req.body.phoneNumber
        });

        const data: any = { ...req.body };

        await db
          .collection('users')
          .updateOne(
            { _id: userId },
            { $set: data },
            { bypassDocumentValidation: true }
          );

        res.status(200).json({
          status: 'success'
        });
      } catch (err) {
        console.log(err);

        res.status(400).json({
          status: 'error',
          error: 'somthing went wrong'
        });
      }
    } catch (err) {
      const message = ErrorHandler(err);

      res.status(400).json({
        status: 'error',
        error: message
      });
    }
  }
};

export default handler;
