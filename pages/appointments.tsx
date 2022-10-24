import { FC, useEffect, useState } from 'react';
import { userType } from '../models/user';
import { ObjectId } from 'mongodb';
import { getUser, pattern } from '../utils/homeHandlers';
import { connectToDatabase } from '../utils/db';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import appService  from './../services/appService'; 
import toast, { Toaster } from 'react-hot-toast';
 
const Appointments: FC<{ session: Session }> = ({ session }) => {
    const [data, setData] = useState([])

    const getAppointment = async () => {
     const app = toast.loading("Loading appointments")
     await appService.allApointment().then((res)=>{
       const dato = res.docs.map((res:any) => ({ ...res.data(), id: res.id}))
       console.log("resoo", dato)
       toast.dismiss(app);
       setData(dato)
     },(err:any) => {
       console.log("resuuu", err.message)
     })
    }   
    
    const seStatus = async (value:any, id:any) => {
        await appService.updateApointment(value, id).then((res:any)=>{ 
          console.log("resoo", res) 
          toast.success('Status changed succesfully', {
            duration: 4000,
            position: 'top-center',
            className: 'bg-success', 
            icon: '👏',
          })
          window.location.reload()
        },(err:any) => {
            toast.error(err.message, {
                duration: 4000,
                position: 'top-center',
                className: 'bg-danger, text-white', 
                icon: '👏',
              })
          console.log("resuuu", err.message)
        })
       }

       const deleteApointment = async (id:any) => {
        await appService.deleteApointment(id).then((res:any)=>{ 
          console.log("resoo", res) 
          toast.success('Deleted succesfully', {
            duration: 4000,
            position: 'top-center',
            className: 'bg-success', 
            icon: '👏',
          })
          window.location.reload()
        },(err:any) => {
            toast.error(err.message, {
                duration: 4000,
                position: 'top-center',
                className: 'bg-danger, text-white', 
                icon: '👏',
              }) 
        })
       }

    useEffect(() => {
        getAppointment()
    }, [])

  return <div> 
                <div className="container-fluid">
 
                    <h1 className="h3 mb-2 text-gray-800">Appointments</h1>
                    <p className="mb-4">All appointment request</p>
 
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Appointment list</h6>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                    <thead>
                                    <tr>
                                            <th>#</th> 
                                            <th>Email</th>
                                            <th>Lastname</th>
                                            <th>Phone</th>
                                            <th>who are you visiting</th>
                                            <th>Visitation purpose</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                       
                                    <tr>
                                            <th>#</th>
                                            <th>Email</th>
                                            <th>Lastname</th>
                                            <th>Phone</th>
                                            <th>who are you visiting</th>
                                            <th>Visitation purpose</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>   
                                    {data.length>0 && data.map((res:any, index:any)=>{
                                            const { id, email, firstname, status, homeaddress, lastname, phone, who_are_you_visiting, visitation_purpose } = res
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{email}</td>
                                                    <td>{lastname}</td>
                                                    <td>{phone}</td>
                                                    <td>{who_are_you_visiting}</td>
                                                    <td>{visitation_purpose}</td>
                                                    <td>
                                                        {status === 0 && <span className="text-success">New</span>}
                                                        {status === 1 && <span className="text-success">Accepted</span>}
                                                        {status === 2 && <span className="text-danger">Rejected</span>}
                                                        </td> 
                                                    <td>
                                                        <button className="btn btn-primary m-1 my-0" onClick={() => {seStatus({status:1}, id) }}>Accept</button>
                                                       <button className="btn btn-primary m-1 my-0" onClick={() => {seStatus({status: 2}, id) }}>Reject</button>
                                                       <button className="btn btn-danger m-1 my-0" onClick={() => {deleteApointment(id) }}>Delete</button>
                                                    </td>
                                                </tr>)
                                        })}
                                        {data.length === 0 &&  <tr>
                                                    <td colSpan={5}>No appointment at the moment</td>
                                                </tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <Toaster />
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

export default Appointments;
