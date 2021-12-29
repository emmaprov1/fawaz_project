import Head from 'next/head';
import Image from 'next/image';

const index = () => {
  return (
    <>
      <Head>
        <title>visit </title>
      </Head>

      <div
        className="col-lg-5 d-none d-lg-block bg-register-image"
        style={{
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      <div className="col-lg-7">
        <div className="p-5">
          <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
          </div>
          <form className="user">
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <input
                  type="text"
                  className="form-control form-control-user"
                  id="exampleFirstName"
                  placeholder="First Name"
                />
              </div>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control form-control-user"
                  id="exampleLastName"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control form-control-user"
                id="exampleInputEmail"
                placeholder="Email Address"
              />
            </div>
            <div className="form-group row">
              <div className="col-sm-6 mb-3 mb-sm-0">
                <input
                  type="password"
                  className="form-control form-control-user"
                  id="exampleInputPassword"
                  placeholder="Password"
                />
              </div>
              <div className="col-sm-6">
                <input
                  type="password"
                  className="form-control form-control-user"
                  id="exampleRepeatPassword"
                  placeholder="Repeat Password"
                />
              </div>
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

export default index;
