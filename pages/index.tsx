/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Image from 'next/image';
import appService from '../services/appService';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
const successImg = '/img/undraw_mailbox_re_dvds.svg'

import Appointments from './appointments';
import fileService from '../services/fileService';

const Index = () => {
  const [imgurl, setImgUrl] = useState('/img/avatar.svg');
  const [img, setImg] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [uploadImg, setUploadedImg] = useState("");
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();



  const onSubmit = async (data:any) => { 
    setLoading(true)
    const toastId = toast.loading('Loading...');
     
      await appService.saveApointment({ ...data, status: 0, photo: uploadImg }).then((res) => { 
        toast.dismiss(toastId);
        setLoading(false)
        setSuccess(true)
        toast.success('Appointment submitted succesfully', {
          duration: 4000,
          position: 'top-center',
          className: 'bg-success', 
          icon: '👏',
        })

      }, (error:any)=>{  
        toast.error(error.message, {
          duration: 4000,
          position: 'top-center',
          className: 'bg-success', 
          icon: '👏',
        })
        console.log(error) 
        setLoading(false)
      })  
   
  };

  const selectPicture: ChangeEventHandler<HTMLInputElement> = async (e:any) => {
    setImgUrl(URL.createObjectURL(e.target.files[0]));
    setImg(e.target.files[0]);
  
    const file = e.target.files

    function isImage (icon:any) {
      const ext = ['.jpg', '.png', '.jpeg'];
      const res = ext.some(el => icon.endsWith(el))
      console.log("zip upload result", res)
      return res
    }
    if (!isImage(file[0].name)) {
      alert("File extension not supported!"); 
      setUploadStatus(false)
      return false
    }
    if (error === false) { 
      await fileService.uploadImage(file).then((res:any) => { 
        console.log("Download url", res)
        setUploadedImg(res)
        setUploadStatus(false)
      }, error => {
        console.log(error.message)
        setUploadStatus(false)
        toast.error("invalid file", { duration: 20000, className: 'bg-danger text-white' });
      })
    }
  }
  
 
  return (
    <>
      <Head>
        <title>visitee - welcome</title>
      </Head>

      {!success? <> 
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
            {errors.file && <div className="text-danger">{errors.file.message}</div>}
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
          <form className="user" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <input
                  type="text"
                  className="form-control form-control-user"
                  id="FirstName"
                  placeholder="First Name" 
                  {...register("firstname", { required : "firstname is required"})}
                />
                {errors.firstname && <div className="text-danger">{errors.firstname.message}</div>}
              </div>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control form-control-user"
                  id="LastName"
                  placeholder="Last Name"
                  {...register("lastname", { required : "lastname is required"})}
                />
                {errors.lastname && <div className="text-danger">{errors.lastname.message}</div>}
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control form-control-user"
                id="InputEmail"
                placeholder="Email Address"
                {...register("email", { required : "email is required"})}
              />
              {errors.email && <div className="text-danger">{errors.email.message}</div>}
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                id="InputAddress"
                placeholder="Home Address"
                {...register("homeaddress", { required : "home address is required"})}
              />
              {errors.homeaddress && <div className="text-danger">{errors.homeaddress.message}</div>}
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control form-control-user"
                id="number"
                placeholder="Phone Number"
                {...register("phone", { required : "phone is required"})}
              />
              {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                id="vistPur"
                placeholder="Visitation Purpose"
                {...register("visitation_purpose", { required : "visitation purpose is required"})}
              />
              {errors.visitation_purpose && <div className="text-danger">{errors.visitation_purpose.message}</div>}
            </div>

            <div className="form-group">
              <input
                id="color"
                list="suggestions"
                className="form-control form-control-user"
                placeholder="Who are you visiting"
                {...register("who_are_you_visiting", { required : "this field is required"})}
              />
              {errors.visitation_purpose && <div className="text-danger">{errors.visitation_purpose.message}</div>}
              <datalist id="suggestions">
                <option value="Official" />
                <option value="Unofficial" />
              </datalist>
            </div>

            {!loading && <button className="btn btn-primary btn-user btn-block" disabled={uploadStatus}>
              Submit Appointment
            </button>} 
            {loading && (<button type="submit" className="btn btn-primary btn-user btn-block" disabled>
                            Please wait
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        </button>)}
          </form>
        </div>
        <Toaster />
      </div>
    </> : 
    <>
    <div className="successContent text-center w-100">
      <div className="row h-100">
        <div className="col-12 my-auto">
          <span>
            <img src={successImg} className="w-25 mb-3"/>
            <h3 className="text-dark">Appointment Reservation Sent</h3>
          </span>
        </div>
      </div>
    </div>
    </>}

    </>
  );
};

export default Index;
