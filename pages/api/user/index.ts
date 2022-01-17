import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import UserSchema from '../../../models/user';
import { connectToDatabase } from '../../../utils/db';
import ErrorHandler from '../../../utils/ErrorHandler';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    try {
      const session = getSession({ req });

      if (!session) throw new Error('please login');

      const { db } = await connectToDatabase();
      const id = new ObjectId(req.query.id.toString());

      const user: UserSchema = await db
        .collection('users')
        .findOne({ _id: id });

      if (!user) throw new Error('user with this account does not exist');

      if (!user.active) throw new Error('this account has been deleted');

      if (!user.verified) throw new Error('this account has not been verified');

      let data: any = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber
      };

      // if (req.query.pin.toString() === 'true') {
      //   if (req.body.oldPIN !== user.PIN) throw new Error('old pin is wrong');

      //   data = { PIN: req.body.PIN };
      // }

      await db
        .collection('users')
        .updateOne(
          { _id: id },
          { $set: data },
          { bypassDocumentValidation: true }
        );

      res.status(200).json({
        status: 'success'
      });
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
