/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Image from 'next/image';
<<<<<<< HEAD
import appService from '../services/appService';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';

import Appointments from './appointments';
=======
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
>>>>>>> 0aefd6fdee7277b4b23292fa1e7f6d114130f1be

const Index = () => {
  const [imgurl, setImgUrl] = useState('/img/avatar.svg');
  const [img, setImg] = useState<File>();
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
=======
>>>>>>> 0aefd6fdee7277b4b23292fa1e7f6d114130f1be

  const selectPicture: ChangeEventHandler<HTMLInputElement> = e => {
    setImgUrl(URL.createObjectURL(e.target.files[0]));
    setImg(e.target.files[0]);
  };

<<<<<<< HEAD
  const onSubmit = async (data:any) => { 
    setLoading(true)
    const toastId = toast.loading('Loading...');
     
      await appService.saveApointment(data).then((res) => { 
        toast.dismiss(toastId);
        setLoading(false)
        toast('Appointment submitted succesfully', {
          duration: 4000,
          position: 'top-center',
          className: 'bg-success', 
          icon: '👏',
        })

      }, (error:any)=>{
         toast.dismiss(toastId);
        console.log(error) 
        setLoading(false)
      })  
   
  };

 
=======
  const submit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
  };

>>>>>>> 0aefd6fdee7277b4b23292fa1e7f6d114130f1be
  return (
    <>
      <Head>
        <title>visitee - welcome</title>
      </Head>

      <div
        className="col-lg-5 bg-register-image align-self-center"
        style={{
          backgroundImage: 'unset',
          paddingLeft: '4rem',
        }}
      >
        <div>
          <img src={imgurl} alt="avatar" className="w-100" />
        </div>
        <form className="user">
          <div className="form-group">
            <input
              type="file"
              className="form-control form-control-user d-none"
              id="fileup"
              placeholder="Phone Number"
              onChange={selectPicture}
              accept="image/png, image/jpeg"
              disabled={loading}
            />
          </div>
          <label
            htmlFor="fileup"
            className="btn btn-primary btn-user btn-block"
          >
            select Picture
          </label>
        </form>
      </div>

      <div className="col-lg-7">
        <div className="p-5">
          <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4">visit</h1>
          </div>
<<<<<<< HEAD
          <form className="user" onSubmit={handleSubmit(onSubmit)}>
=======
          <form className="user" onSubmit={submit}>
>>>>>>> 0aefd6fdee7277b4b23292fa1e7f6d114130f1be
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <input
                  type="text"
                  className="form-control form-control-user"
                  id="FirstName"
<<<<<<< HEAD
                  placeholder="First Name" 
                  {...register("firstname")}
=======
                  placeholder="First Name"
>>>>>>> 0aefd6fdee7277b4b23292fa1e7f6d114130f1be
                />
              </div>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control form-control-user"
                  id="LastName"
                  placeholder="Last Name"
<<<<<<< HEAD
                  {...register("lastname")}
=======
>>>>>>> 0aefd6fdee7277b4b23292fa1e7f6d114130f1be
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control form-control-user"
                id="InputEmail"
                placeholder="Email Address"
<<<<<<< HEAD
                {...register("email")}
=======
>>>>>>> 0aefd6fdee7277b4b23292fa1e7f6d114130f1be
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                id="InputAddress"
                placeholder="Home Address"
<<<<<<< HEAD
                {...register("homeaddress")}
=======
>>>>>>> 0aefd6fdee7277b4b23292fa1e7f6d114130f1be
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control form-control-user"
                id="number"
                placeholder="Phone Number"
<<<<<<< HEAD
                {...register("phone")}
=======
>>>>>>> 0aefd6fdee7277b4b23292fa1e7f6d114130f1be
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                id="vistPur"
                placeholder="Visitation Purpose"
<<<<<<< HEAD
                {...register("visitation_purpose")}
=======
>>>>>>> 0aefd6fdee7277b4b23292fa1e7f6d114130f1be
              />
            </div>

            <div className="form-group">
              <input
                id="color"
                list="suggestions"
                className="form-control form-control-user"
                placeholder="Who are you visiting"
<<<<<<< HEAD
                {...register("who_are_you_visiting")}
=======
>>>>>>> 0aefd6fdee7277b4b23292fa1e7f6d114130f1be
              />
              <datalist id="suggestions">
                <option value="Black" />
              </datalist>
            </div>

<<<<<<< HEAD
            {!loading && <button className="btn btn-primary btn-user btn-block">
              Submit Appointment
            </button>} 
            {loading && (<button type="submit" className="btn btn-primary btn-user btn-block" disabled>
                            Please wait
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </button>)}
          </form>
        </div>
        <Toaster />
=======
            <button className="btn btn-primary btn-user btn-block">
              Register Account
            </button>
          </form>
        </div>
>>>>>>> 0aefd6fdee7277b4b23292fa1e7f6d114130f1be
      </div>
    </>
  );
};

export default Index;
