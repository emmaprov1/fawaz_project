import { AppContextProvider } from '../context/AppContext';
import Layout from '../Layouts/Layout';
import '../styles/globals.scss';
import 'intl-tel-input/build/css/intlTelInput.css';

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}

export default MyApp;
