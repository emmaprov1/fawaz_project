/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Image from 'next/image';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

const Index = () => {
  const [imgurl, setImgUrl] = useState('/img/avatar.svg');
  const [img, setImg] = useState<File>();
  const [loading, setLoading] = useState(false);

  const selectPicture: ChangeEventHandler<HTMLInputElement> = e => {
    setImgUrl(URL.createObjectURL(e.target.files[0]));
    setImg(e.target.files[0]);
  };

  const submit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
  };

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
          <form className="user" onSubmit={submit}>
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <input
                  type="text"
                  className="form-control form-control-user"
                  id="FirstName"
                  placeholder="First Name"
                />
              </div>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control form-control-user"
                  id="LastName"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control form-control-user"
                id="InputEmail"
                placeholder="Email Address"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                id="InputAddress"
                placeholder="Home Address"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control form-control-user"
                id="number"
                placeholder="Phone Number"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                id="vistPur"
                placeholder="Visitation Purpose"
              />
            </div>

            <div className="form-group">
              <input
                id="color"
                list="suggestions"
                className="form-control form-control-user"
                placeholder="Who are you visiting"
              />
              <datalist id="suggestions">
                <option value="Black" />
              </datalist>
            </div>

            <button className="btn btn-primary btn-user btn-block">
              Register Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
