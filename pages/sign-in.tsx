import { FC, FormEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import useInput from '../hooks/use-input';
import { getUser, pattern } from '../utils/homeHandlers';
import { connectToDatabase } from '../utils/db';
// import { ObjectId } from 'mongodb';
import { userType } from '../models/user';

const SignIn: FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formISValid, setFormValid] = useState(false);
  const [showHide, setShowHide] = useState(false);

  const {
    value: emailValue,
    isValid: emailIsValid,
    InputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    reset: resetEmail,
    valueChangeHandler: emailValueHandler,
    InputFocusHandler: emailFocusHandler,
    focus: emailFocus,
  } = useInput(value => pattern.test(value));

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    InputBlurHandler: passwordBlurHandler,
    hasError: passwordHasError,
    reset: resetPassword,
    valueChangeHandler: passwordValueHandler,
    InputFocusHandler: passwordFocusHandler,
    focus: passwordFocus,
  } = useInput(value => value.trim() !== '');

  useEffect(() => {
    if (emailIsValid && passwordIsValid) setFormValid(true);
  }, [emailIsValid, passwordIsValid]);

  const router = useRouter();

  const loggin = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    signIn('credentials', {
      redirect: false,
      email: emailValue.toLowerCase(),
      password: passwordValue,
    })
      .then(res => {
        if (res.error) throw new Error(res.error);

        router.replace('/');
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        resetEmail();
        resetPassword();
      });
  };

  return (
    <>
      <Head>
        <title>Fawazia Project - sign in</title>
      </Head>

      <div
        className="col-lg-6 d-none d-lg-block bg-login-image"
        style={{
          backgroundSize: '80%',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      <div className="col-lg-6">
        <div className="p-5">
          <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
          </div>
          <form className="user">
            <div className="form-group">
              <input
                type="email"
                className="form-control form-control-user"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter Email Address..."
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control form-control-user"
                id="exampleInputPassword"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <div className="custom-control custom-checkbox small">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck"
                />
                <label className="custom-control-label" htmlFor="customCheck">
                  Remember Me
                </label>
              </div>
            </div>
            <a href="index.html" className="btn btn-primary btn-user btn-block">
              Login
            </a>
          </form>
          <hr />
          <div className="text-center">
            <a className="small" href="forgot-password.html">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession({ req: context.req });

  // if (session) {
  //   const { db } = await connectToDatabase();
  //   const id = new ObjectId(session.user.email);
  //   const user = await getUser(db, id);

  //   if (user) {
  //     let linkGoto = '/';

  //     return {
  //       redirect: {
  //         destination: linkGoto,
  //         permanent: false,
  //       },
  //     };
  //   }
  // }

  return {
    props: {},
  };
};

export default SignIn;
