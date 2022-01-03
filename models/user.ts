export enum userType {
  Staff = 'staff',
  Admin = 'admin',
}

export default interface UserSchema {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  password: string;
  passwordConfirm: string;
  address?: string;
  country?: string;
  photo?: string;
  type: userType;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  active?: boolean;
  verified?: boolean;
  verifyToken?: number;
  completed?: boolean;
  regNo?: number;
}
