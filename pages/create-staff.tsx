import { FC } from 'react';
import { userType } from '../models/user';
import { ObjectId } from 'mongodb';
import { getUser, pattern } from '../utils/homeHandlers';
import { connectToDatabase } from '../utils/db';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';

const CreateStaff: FC<{ session: Session }> = ({ session }) => {
  return <div>
       <div className="container-fluid"> 
        <h1 className="h3 mb-2 text-gray-800">Create Staff</h1> 
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0"> 
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create Staff</h1>
                                </div>
                                <form className="user"> 
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                                            placeholder="Email Address"/>
                                    </div> 
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-user" id="exampleInputEmail"
                                            placeholder="Email Address"/>
                                    </div> 
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-primary btn-user btn-block" id="exampleInputEmail"
                                            placeholder="Email Address" value="Change"/>
                                    </div> 
                                </form> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </div>

  </div>;
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

  return {
    props: {
      session,
      type: user.type,
    },
  };
};

export default CreateStaff;
