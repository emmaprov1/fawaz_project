import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../../utils/db';
import ErrorHandler from '../../../utils/ErrorHandler';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { db } = await connectToDatabase();

      await db.collection('visits').insertOne(req.body);

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
  } else if (req.method === 'GET') {
    try {
      const session = getSession({ req });
      if (!session) throw new Error('please login');

      const { db } = await connectToDatabase();

      const data = await db.collection('visits').find();

      res.status(200).json({
        status: 'success',
        visits: data,
      });
    } catch (err) {
      const message = ErrorHandler(err);

      res.status(400).json({
        status: 'error',
        error: message,
      });
    }
  } else {
    res.status(400).json({
      status: 'error',
      error: 'request error',
    });
  }
};

export default handler;
