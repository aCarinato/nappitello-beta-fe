// react / next
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// stripe
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from '@stripe/react-stripe-js';
// components
import SpinningLoader from '../UI/SpinningLoader';
import BtnCTA from '../UI/BtnCTA';
// styles
import classes from './CheckoutForm.module.css';

// state
// import { Store } from '../context/Store';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  // const { state, dispatch } = useContext(Store);
  // const { cart } = state;

  // routing
  const router = useRouter();
  const { locale } = router;

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      console.log('niente');
      return;
    }

    setIsProcessing(true);

    const payload = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // redirect: 'if_required',
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (
      payload.error.type === 'card_error' ||
      payload.error.type === 'validation_error'
    ) {
      setMessage(error.message);
    } else {
      // setMessage('An unexpected error occured.');
      // dispatch({ type: 'CART_CLEAR_ITEMS' });
      // localStorage.setItem(
      //   'nappi-cart',
      //   JSON.stringify({
      //     ...cart,
      //     cartItems: [],
      //   })
      // );
    }

    setIsProcessing(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    // <>
    //   {isProcessing ? (
    //     <SpinningLoader />
    //   ) : (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement options={paymentElementOptions} />
      {/* <BtnCTA
        label={locale === 'it' ? 'Completa pagamento' : 'Complete Payment'}
        onClickAction={handleSubmit}
      /> */}
      <br></br>
      <button
        className={classes['btn-cta']}
        disabled={isProcessing}
        id="submit"
      >
        <span id="button-text">
          {locale === 'en' && isProcessing
            ? 'Processing... '
            : locale === 'en' && !isProcessing
            ? 'Pay now'
            : locale === 'it' && isProcessing
            ? 'In corso... '
            : 'Completa pagamento'}
          {/* {locale === 'it' && isProcessing
            ? 'Processing... '
            : 'Completa pagamento'} */}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
    //   )}
    // </>
  );
}

export default CheckoutForm;
