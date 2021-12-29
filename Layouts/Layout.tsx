import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import { FC, FormEvent, Fragment } from 'react';
import Header from '../components/Header/Header';
// import Footer from '../components/Footer/Footer';

const Layout: FC = ({ children }) => {
  const router = useRouter();

  const search = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Fawazia - project</title>
      </Head>

      {!['/sign-in'].includes(router.pathname) ? (
        <>
          <Header />
        </>
      ) : (
        <> {children}</>
      )}
    </Fragment>
  );
};

export default Layout;
