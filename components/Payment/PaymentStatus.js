// stri[e]
import { useStripe } from '@stripe/react-stripe-js';
// react / next
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function PaymentStatus() {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  // const [status, setStatus] = useState(null);

  // routing
  const router = useRouter();
  const { locale } = router;

  // console.log(`locale from PaymentStatus.js: ${locale}`);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage(
            locale === 'en' ? 'Payment succeeded!' : 'Pagamento riuscito!'
          );
          // setStatus('succeeded')
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          // setStatus('processing')
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          // setStatus('requires_payment_method')
          break;
        default:
          setMessage('Something went wrong.');
          // setStatus('Something went wrong.')
          break;
      }
    });
  }, [stripe]);

  return message;
}

export default PaymentStatus;
