// import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { userType } from '../../../models/user';
import { hashPassword } from '../../../utils/authHandler';
import { connectToDatabase } from '../../../utils/db';
import Email from '../../../utils/email';
import ErrorHandler from '../../../utils/ErrorHandler';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // const { db } = await connectToDatabase();
    // try {
    //   if (!req.headers.referer.endsWith('/sign-up'))
    //     throw new Error('something went wrong');
    //   const newPW = await hashPassword(req.body.password);
    //   const hospital = req.query && req.query?.hospital?.toString() === 'true';
    //   // let verifyToken : number;
    //   const newUser = await db.collection('users').insertOne({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: newPW,
    //     photo: 'default.jpg',
    //     ...(!hospital && {
    //       verifyToken:
    //         Math.floor(Math.random() * (999999 - 100000) + 1) + 100000,
    //     }),
    //     active: true,
    //     verified: false,
    //     type: hospital ? userType.Hospital : userType.Patient,
    //   });
    //   const user = await db
    //     .collection('users')
    //     .findOne({ _id: newUser.insertedId }, { projection: { password: 0 } });
    //   const url = `http${process.env.NODE_ENV === 'development' ? '' : 's'}://${
    //     req.headers.host
    //   }/sign-up/complete?id=${user._id}`;
    //   if (!hospital)
    //     try {
    //       await new Email(user, url).sendWelcome();
    //     } catch (_) {
    //       await db.collection('users').deleteOne({ _id: user._id });
    //       throw new Error('something went wrong');
    //     }
    //   res.status(201).json({
    //     status: 'success',
    //     user,
    //   });
    // } catch (err) {
    //   const message = ErrorHandler(err);
    //   res.status(400).json({
    //     status: 'error',
    //     error: message,
    //   });
    // }
  }
};

export default handler;
