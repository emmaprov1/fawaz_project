import { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/client';
import UserSchema from '../../../models/user';
import { connectToDatabase } from '../../../utils/db';
import ErrorHandler from '../../../utils/ErrorHandler';
import { ObjectId } from 'mongodb';
// import client from 'twilio';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
  }
    
};

export default handler;
