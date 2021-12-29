import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export const correctPassword = async (
  candidatePassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export const hashPassword = async (password: string) => {
  // Hash the password with cost of 12
  return await bcrypt.hash(password, 12);
};

export const createPasswordResetToken = async (db: any, email: string) => {
  const resetToken = crypto.randomBytes(32).toString('hex');

  const passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

  await db
    .collection('users')
    .updateOne(
      { email },
      { $set: { passwordResetToken, passwordResetExpires } },
      { bypassDocumentValidation: true }
    );

  return resetToken;
};
