import { FC, FormEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import useInput from '../hooks/use-input';
import { getUser, pattern } from '../utils/homeHandlers';
import { connectToDatabase } from '../utils/db';
import { userType } from '../models/user';
import { ObjectId } from 'mongodb';

const SignIn: FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formISValid, setFormValid] = useState(false);

  const {
    value: emailValue,
    isValid: emailIsValid,
    InputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    reset: resetEmail,
    valueChangeHandler: emailValueHandler,
    InputFocusHandler: emailFocusHandler,
  } = useInput(value => pattern.test(value));

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    InputBlurHandler: passwordBlurHandler,
    hasError: passwordHasError,
    reset: resetPassword,
    valueChangeHandler: passwordValueHandler,
    InputFocusHandler: passwordFocusHandler,
  } = useInput(value => value.trim() !== '' && value.length > 7);

  useEffect(() => {
    if (emailIsValid && passwordIsValid) setFormValid(true);
    else setFormValid(false);
  }, [emailIsValid, passwordIsValid]);

  const router = useRouter();

  const loggin = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
<<<<<<< HEAD
    setError(''); 
=======
    setError('');

>>>>>>> 0aefd6fdee7277b4b23292fa1e7f6d114130f1be
    signIn('credentials', {
      redirect: false,
      email: emailValue.toLowerCase(),
      password: passwordValue,
    })
      .then(res => {
        if (res.error) throw new Error(res.error);

        router.replace('/dashboard');
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
          <form onSubmit={loggin} className="user">
            {error && <p className="text-danger text-center">{error}</p>}

            <div className="form-group">
              <input
                type="email"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter Email Address..."
                onBlur={emailBlurHandler}
                onChange={emailValueHandler}
                value={emailValue}
                onFocus={emailFocusHandler}
                className={`form-control form-control-user${
                  emailHasError ? ' form-invalid' : ''
                }`}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className={`form-control form-control-user${
                  passwordHasError ? ' form-invalid' : ''
                }`}
                id="exampleInputPassword"
                placeholder="Password"
                onBlur={passwordBlurHandler}
                onChange={passwordValueHandler}
                value={passwordValue}
                onFocus={passwordFocusHandler}
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
            <button
              disabled={!formISValid || loading}
              className="btn btn-primary btn-user btn-block"
            >
              Sign in
            </button>
          </form>
          <hr />
          <div className="text-center">
            {/* <a className="small" href="forgot-password.html">
              Forgot Password?
            </a> */}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession({ req: context.req });

  if (session) {
    const { db } = await connectToDatabase();
    const id = new ObjectId(session.user.email);
    const user = await getUser(db, id);

    if (user) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};

export default SignIn;
