// import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { userType } from '../../../models/user';
import { hashPassword } from '../../../utils/authHandler';
import { connectToDatabase } from '../../../utils/db';
import Email from '../../../utils/email';
import ErrorHandler from '../../../utils/ErrorHandler';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
  }
};

export default handler;
