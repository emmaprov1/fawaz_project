import { FC } from 'react';
import { userType } from '../models/user';
import { ObjectId } from 'mongodb';
import { getUser, pattern } from '../utils/homeHandlers';
import { connectToDatabase } from '../utils/db';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

const Staff: FC = () => {
  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession({ req: context.req });

  if (!session)
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };

  const { db } = await connectToDatabase();
  const id = new ObjectId(session.user.email);
  const user = await getUser(db, id);

  if (!user)
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };

  if (user.type === userType.Admin)
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };

  return {
    props: {
      session,
    },
  };
};

export default Staff;
