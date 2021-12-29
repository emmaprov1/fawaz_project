import { AppContextProvider } from '../context/AppContext';
import { SessionProvider } from 'next-auth/react';
import Layout from '../Layouts/Layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    // <SessionProvider session={session}>
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
    // </SessionProvider>
  );
}

export default MyApp;
