import UserSchema from '../models/user';

export const getUser = async (db: any, id: any) => {
  const user: UserSchema = await db.collection('users').findOne(
    { _id: id },
    {
      projection: {
        password: 0,
        verifyToken: 0,
        _v: 0,
      },
    }
  );

  return user;
};

export const pattern =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
