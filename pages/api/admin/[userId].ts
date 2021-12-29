import { NextApiRequest, NextApiResponse } from 'next';
import UserSchema from '../../../models/user';
import { connectToDatabase } from '../../../utils/db';
import ErrorHandler from '../../../utils/ErrorHandler';
import { ObjectId } from 'mongodb';
import Email from '../../../utils/email';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const userId = new ObjectId(req.query.userId.toString());

      const user: UserSchema = await db
        .collection('users')
        .findOne({ _id: userId }, { projection: { password: 0 } });

      if (!user) throw new Error('user with this account does not exist');

      await db
        .collection('users')
        .updateOne(
          { _id: userId },
          { $set: { verified: true } },
          { bypassDocumentValidation: true }
        );

      const url = `http${process.env.NODE_ENV === 'development' ? '' : 's'}://${
        req.headers.host
      }/hospital/signup-doctors`;

      try {
        await new Email(user, url).sendWelcome();
      } catch (_) {
        throw new Error('something went wrong');
      }

      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      const message = ErrorHandler(err);

      res.status(400).json({
        status: 'error',
        error: message,
      });
    }
  }
};

export default handler;
