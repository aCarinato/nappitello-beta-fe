import '../styles/globals.css';
// react / next
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
// context
import { StoreProvider } from '../context/Store';

// import { ContextProvider } from '../context/Context';
// import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function MyApp({ Component, pageProps }) {
  return (
    // <ContextProvider>
    <StoreProvider>
      <Layout>
        <Head>
          <title>Nappitello</title>
          <meta name="description" content="Olio biologico 100% pugliese" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
    // </ContextProvider>
  );
}

export default MyApp;