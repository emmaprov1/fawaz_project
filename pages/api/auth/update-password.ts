import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/db';
import ErrorHandler from '../../../utils/ErrorHandler';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';
import { correctPassword, hashPassword } from '../../../utils/authHandler';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const session = getSession({ req });

      if (!session) throw new Error('please login');

      const { db } = await connectToDatabase();

      const id = req.query.id.toString();

      const user = await db
        .collection('users')
        .findOne({ _id: new ObjectId(id) });

      if (!user) throw new Error('user does not exist');

      if (!(await correctPassword(req.body.oldPassword, user.password)))
        throw new Error('Your current password is wrong.');

      const newPW = await hashPassword(req.body.newPassword);

      await db
        .collection('users')
        .updateOne(
          { _id: new ObjectId(id) },
          { $set: { password: newPW } },
          { bypassDocumentValidation: true }
        );

      res.status(201).json({
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
