// react / next
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// libs
import axios from 'axios';
// components
import CheckoutForm from './CheckoutForm';
// context
import { useMainContext } from '../../context/User';
import { Store } from '../../context/Store';

// load stripe outside component render to avoid recreating stripe object on every render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function Payment(props) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  const { authState } = useMainContext();

  const { totalPrice } = props;

  const router = useRouter();
  const { locale } = router;

  // const { cartItems, shippingAddress, paymentMethod } = cart;

  //   const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  // const [shipping, setShipping] = useState({});

  //   useEffect(() => {
  //     setStripePromise(
  //       loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)
  //     );
  //   }, []);

  // useEffect(() => {
  //   setShipping({
  //     name: shippingAddress.fullName,
  //     address: {
  //       city: shippingAddress.city,
  //       country: shippingAddress.country,
  //       line1: shippingAddress.address,
  //       postal_code: shippingAddress.postalCode,
  //       state: shippingAddress.stateOrProvince,
  //     },
  //   });
  // }, [shippingAddress]);

  // console.log(shipping);

  const createPaymentIntent = async () => {
    // const shipping = {
    //   name: 'Gigetto Mancuso',
    //   address: {
    //     city: 'Trieste',
    //     country: 'IT',
    //     line1: 'Via Lollo Mulon, 883',
    //     postal_code: '38118',
    //     state: 'Friuli Venezia Giulia',
    //   },
    // };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/stripe/create-payment-intent`,
      {
        email: authState.email,
        stripeId: authState.stripeId,
        totalPrice,
        shipping: {
          name: shippingAddress.fullName,
          address: {
            city: shippingAddress.city,
            country: shippingAddress.country,
            line1: shippingAddress.address,
            postal_code: shippingAddress.postalCode,
            state: shippingAddress.stateOrProvince,
          },
        },
      }
      //   {
      //     headers: {
      //       Authorization: `Bearer ${authState.token}`,
      //     },
      //   }
    );

    return res.data.clientSecret;
  };

  useEffect(() => {
    // if (shipping !== {}) {
    createPaymentIntent().then((res) => {
      // const secret = res;
      setClientSecret(res);
      // return secret;
    });
    // }
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
