import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/db';
import ErrorHandler from '../../../utils/ErrorHandler';
import crypto from 'crypto';
import { hashPassword } from '../../../utils/authHandler';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.query.token.toString())
      .digest('hex');

    try {
      if (
        !req.headers.referer ||
        !req.headers.referer.includes('/reset-password')
      )
        throw new Error('you have to go through the reset password page');

      const { db } = await connectToDatabase();

      const user = await db.collection('users').findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: new Date() }
      });

      if (!user) throw new Error('Token is invalid or has expired');

      if (req.body.password !== req.body.passwordConfirm)
        throw new Error("password don't match");

      const hashPW = await hashPassword(req.body.password);

      await db.collection('users').updateOne(
        {
          passwordResetToken: hashedToken,
          passwordResetExpires: { $gt: new Date() }
        },
        {
          $set: { password: hashPW },
          $unset: {
            passwordResetToken: '',
            passwordResetExpires: ''
          }
        },
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
