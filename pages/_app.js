import '../styles/globals.css';
// react / next
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
// context
import { StoreProvider } from '../context/Store';
import { UserContextProvider } from '../context/User';

// import { ContextProvider } from '../context/Context';
// import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function MyApp({ Component, pageProps }) {
  return (
    // <ContextProvider>
    <UserContextProvider>
      <StoreProvider>
        <Layout>
          <Head>
            <title>eCommerce</title>
            <meta name="description" content="Olio biologico 100% pugliese" />
            <meta name="robots" content="noindex"></meta>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </UserContextProvider>

    // </ContextProvider>
  );
}

export default MyApp;
