import { FC, FormEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import { signIn, getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Button, { btnType } from '../components/Button/Button';
import useInput from '../hooks/use-input';
import { getUser, pattern } from '../utils/homeHandlers';
import { connectToDatabase } from '../utils/db';
import { ObjectId } from 'mongodb';
import { userType } from '../models/user';

const SignIn: FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formISValid, setFormValid] = useState(false);
  const [patient, setPatient] = useState(true);
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

  const PatientDoctorSwitch = () => {
    setPatient(pat => !pat);
  };

  const showHideHandler = (e: FormEvent) => {
    e.preventDefault();
    setShowHide(!showHide);
  };

  return (
    <>
      <Head>
        <title>RiDokita - sign in</title>
      </Head>

      <main className="signIn">
        <section className="signIn-left">
          <div className="signIn-logo">
            <Image
              src="/images/icons/RiDokita.png"
              height={74}
              width={399}
              alt="logo"
              className="signIn-left-img"
            />
          </div>

          <h2 className="signIn-heading">welcome back</h2>

          {/* <div className="signIn-docPat">
            <button
              className={`signIn-docPat-btn ${
                !patient && 'signIn-docPat-active'
              }`}
              onClick={PatientDoctorSwitch}
            >
              DOCTOR
            </button>
            <button
              className={`signIn-docPat-btn ${
                patient && 'signIn-docPat-active'
              }`}
              onClick={PatientDoctorSwitch}
            >
              PATIENT
            </button>
          </div> */}

          <button className="signIn-alt signIn-btn">
            <Image
              height={26}
              width={26}
              src="/images/icons/googleicon.png"
              alt="google icon"
            />

            <span>Log in with Google</span>
          </button>

          <form className="signIn-form" onSubmit={loggin}>
            <p>login with email</p>
            {error && <span className="signIn-error text-center">{error}</span>}

            <div className="signIn-input">
              <label htmlFor="email">Email address*</label>

              <div
                className={`signIn-box ${
                  emailHasError ? 'signIn-invalid' : ''
                } ${emailFocus ? 'signIn-focus' : ''}`}
              >
                <input
                  id="email"
                  type="text"
                  onBlur={emailBlurHandler}
                  onChange={emailValueHandler}
                  value={emailValue}
                  onFocus={emailFocusHandler}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="signIn-input">
              <label htmlFor="password">Password*</label>

              <div
                className={`signIn-box${
                  passwordHasError ? ' signIn-invalid' : ''
                } ${passwordFocus ? 'signIn-focus' : ''}`}
              >
                <input
                  id="password"
                  type={showHide ? 'text' : 'password'}
                  onBlur={passwordBlurHandler}
                  onChange={passwordValueHandler}
                  value={passwordValue}
                  onFocus={passwordFocusHandler}
                  placeholder="Enter password"
                />
                <button onClick={showHideHandler}>
                  {showHide ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="signIn-group">
              <div className="signIn-check">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>

              <Link href="/forgot-password">
                <a>Forgot password</a>
              </Link>
            </div>

            <Button
              type={btnType.Btn}
              title="LOG IN"
              addStyle="button-blue signIn-btn"
              disabled={!formISValid || loading}
            />

            <p className="signIn-up signIn-para">
              Don’t have an account yet?
              <Link href="/sign-up">
                <a> Sign Up</a>
              </Link>
            </p>
          </form>
        </section>

        <section className="signIn-right">
          <Image
            src="/images/icons/Group 11.png"
            height={440}
            width={687}
            alt="sign in right"
            className="signIn-right-img"
          />
        </section>
      </main>
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
      let linkGoto = '/';

      if (user.type === userType.Hospital) linkGoto = '/hospital';
      if (user.type === userType.Doctor) linkGoto = '/doctor';

      return {
        redirect: {
          destination: linkGoto,
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
