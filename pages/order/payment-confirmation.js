// react / next
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
// context
import { Store } from '../../context/Store';
import { useMainContext } from '../../context/User';
// component
import PaymentStatus from '../../components/Payment/PaymentStatus';
// stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// load stripe outside component render to avoid recreating stripe object on every render
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

function PaymentConfirmationPage() {
  // const { language } = useMainContext();

  // console.log(`language from completion.js: ${language}`);

  // routing
  // const router = useRouter();
  // const { locale } = router;

  // console.log(`locale from completion.js: ${locale}`);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  // useEffect(() => {
  //   const localCart = JSON.parse(localStorage.getItem('nappitello-cart'));
  //   console.log(localCart);
  // }, []);

  useEffect(() => {
    dispatch({ type: 'CART_CLEAR_ITEMS' });
    localStorage.setItem(
      'nappitello-cart',
      JSON.stringify({
        ...cart,
        cartItems: [],
      })
    );
  }, []);

  const options = {};

  return (
    <div>
      <h1>Payment completed</h1>
      {/* <h1>{locale === 'en' ? 'Payment completed!' : 'Pagamento riuscito'}</h1> */}
      {/* <h1>
        {stripePromise && (
          <Elements stripe={stripePromise} options={options}>
            <PaymentStatus />
          </Elements>
        )}
      </h1> */}
    </div>
  );
}

export default PaymentConfirmationPage;
