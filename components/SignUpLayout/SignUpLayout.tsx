import { FC, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const SignUpLayout: FC<{ hospital: boolean }> = ({ children, hospital }) => {
  return (
    <>
      <Head>
        <title>RiDokita - sign up</title>
      </Head>

      <main className="signUp">
        <section className={`signUp-left${hospital ? ' signUp-left-hos' : ''}`}>
          <div className="signUp-logo">
            <Image
              src="/images/icons/RiDokita.png"
              height={43}
              width={202}
              alt="logo"
              className="signIn-left-img"
            />
          </div>

          <p className="signUp-quote">
            “The doctor of the future will give no medicine, but will instruct
            his patients in care of the human frame, in diet, and in the cause
            and prevention of disease.”
          </p>
          <p className="signUp-th">
            Thomas Edison{'   '}
            <svg>
              <use xlinkHref="/images/icons/icons.svg#icon-greencross" />
            </svg>
          </p>
        </section>

        <section className="signUp-img">
          <Image
            src="/images/icons/signup-img.png"
            height={480}
            width={600}
            alt="img sign"
          />
        </section>

        <section className={`signUp-cap${hospital ? ' signUp-cap-hos' : ''}`}>
          healthcare without bondaries - only with Ridokita
        </section>

        <section
          className={`signUp-right${hospital ? ' signUp-right-hos' : ''}`}
        >
          {children}
        </section>
      </main>
    </>
  );
};

export default SignUpLayout;
