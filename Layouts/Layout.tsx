import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import { FC, FormEvent, Fragment } from 'react';
import Header from '../components/Header/Header';
import TopBar from '../components/TopBar/TopBar';
import Footer from '../components/Footer/Footer';

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

      {!['/', '/sign-in', '/404', '/500'].includes(router.pathname) ? (
        <div id="wrapper">
          <Header />

          <main id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <TopBar />
              <div className="container-fluid">{children}</div>
              <Footer />
            </div>
          </main>
        </div>
      ) : (
        <main className="bg-gradient-primary">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                  <div className="card-body p-0">
                    <div className="row">{children}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </Fragment>
  );
};

export default Layout;
