import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/db';
import ErrorHandler from '../../../utils/ErrorHandler';
import { ObjectId } from 'mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      if (
        !req.headers.referer ||
        !req.headers.referer.includes('/sign-up/complete')
      )
        throw new Error('something went wrong');

      const { db } = await connectToDatabase();

      const id = req.query.id.toString();

      const user = await db
        .collection('users')
        .findOne({ _id: new ObjectId(id) });

      if (!user) throw new Error('user does not exist');

      if (user.verifyToken !== parseInt(req.body.verifyToken, 10))
        throw new Error('wrong token');

      await db
        .collection('users')
        .updateOne(
          { _id: new ObjectId(id) },
          { $set: { verified: true }, $unset: { verifyToken: '' } },
          { bypassDocumentValidation: true }
        );

      res.status(201).json({
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
