// react / next
import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// libs
import axios from 'axios';
// components
import CheckoutForm from './CheckoutForm';

function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    setStripePromise(
      loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)
    );
  }, []);

  const createPaymentIntent = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/stripe/create-payment-intent`
      //   { totalPrice },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${authState.token}`,
      //     },
      //   }
    );
    console.log('createPaymentIntent()');
    console.log(res);

    return res.data.clientSecret;
  };

  useEffect(() => {
    createPaymentIntent()
      .then((res) => {
        // console.log('create payment intent');
        const secret = res;
        return secret;
      })
      .then((secret) => {
        setClientSecret(secret);
      });
  }, []);

  //   console.log(clientSecret);

  const appearance = {
    theme: 'stripe', // flat, night,

    // variables: {
    //   colorPrimary: '#0570de',
    //   colorBackground: '#ffffff',
    //   colorText: '#30313d',
    //   colorDanger: '#df1b41',
    //   fontFamily: 'Ideal Sans, system-ui, sans-serif',
    //   spacingUnit: '2px',
    //   borderRadius: '4px',
    //   // See all possible variables below
    // },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <h1>Stripe Payment</h1>
      {stripePromise && clientSecret !== '' && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
