import { NextApiRequest, NextApiResponse } from 'next';
import { createPasswordResetToken } from '../../../utils/authHandler';
import { connectToDatabase } from '../../../utils/db';
import Email from '../../../utils/email';
import ErrorHandler from '../../../utils/ErrorHandler';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      if (
        !req.headers.referer ||
        !req.headers.referer.includes('/forgot-password')
      )
        throw new Error('you have to go through the forgot password page');

      const { db } = await connectToDatabase();

      const { email } = req.body;

      const user = await db.collection('users').findOne({ email });

      if (!user) throw new Error('user does not exist');

      const resetToken = await createPasswordResetToken(db, email.toString());

      const emailLink = `${req.headers.origin}/reset-password?token=${resetToken}`;

      try {
        await new Email(user, emailLink).sendPasswordReset();
      } catch (err) {
        await db.collection('users').updateOne(
          { email },
          {
            $unset: {
              passwordResetToken: '',
              passwordResetExpires: ''
            }
          },
          { bypassDocumentValidation: true }
        );

        res.status(400).json({
          status: 'error',
          error: 'error sending email'
        });
      }

      res.status(201).json({
        status: 'success',
        message:
          'A link to reset your password has been sent to your email. please avoid sending another request'
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
