// react / next
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// libs
import axios from 'axios';
// components
import CheckoutForm from './CheckoutForm';

// load stripe outside component render to avoid recreating stripe object on every render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function Payment(props) {
  const { totalPrice } = props;

  const router = useRouter();
  const { locale } = router;

  // const { cartItems, shippingAddress, paymentMethod } = cart;

  //   const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     setStripePromise(
  //       loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)
  //     );
  //   }, []);

  const createPaymentIntent = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/stripe/create-payment-intent`,
      { totalPrice }
      //   {
      //     headers: {
      //       Authorization: `Bearer ${authState.token}`,
      //     },
      //   }
    );

    return res.data.clientSecret;
  };

  useEffect(() => {
    createPaymentIntent().then((res) => {
      // const secret = res;
      setClientSecret(res);
      // return secret;
    });
  }, []);

  const appearance = {
    theme: 'stripe', // flat, night,

    variables: {
      fontFamily: 'Cormorant Garamond, serif',
      // colorPrimary: '#0570de',
      // colorBackground: '#ffffff',
      // colorText: '#30313d',
      // colorDanger: '#df1b41',
      // fontFamily: 'Ideal Sans, system-ui, sans-serif',
      // spacingUnit: '2px',
      // borderRadius: '4px',
      // See all possible variables below
    },
  };

  const stripeLocale = locale;

  // const stripeFonts = [
  //   { cssSrc: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond' },
  // ];

  const options = {
    clientSecret,
    appearance,
    locale: stripeLocale,
    // fonts: stripeFonts,  // Does not work this way
  };

  return (
    <div>
      {stripePromise && clientSecret !== '' && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
