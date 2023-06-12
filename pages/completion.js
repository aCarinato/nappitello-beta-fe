// react / next
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
// context
import { Store } from '../context/Store';
// component
import PaymentStatus from '../components/Payment/PaymentStatus';
// stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// load stripe outside component render to avoid recreating stripe object on every render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function CompletionPage() {
  // routing
  const router = useRouter();
  const { locale } = router;

  console.log(`locale from completion.js: ${locale}`);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  useEffect(() => {
    dispatch({ type: 'CART_CLEAR_ITEMS' });
    localStorage.setItem(
      'nappi-cart',
      JSON.stringify({
        ...cart,
        cartItems: [],
      })
    );
  }, []);

  const options = {};

  // useEffect(() => {
  //   if (locale === 'it') {
  //     router.push('/pagamento');
  //   }
  //   if (locale === 'de') {
  //     router.push('/wagen');
  //   }
  // }, [locale]);

  return (
    <div>
      {/* <h1>Payment completed!</h1> */}
      <h1>
        {stripePromise && (
          <Elements stripe={stripePromise} options={options}>
            <PaymentStatus />
          </Elements>
        )}
      </h1>
    </div>
  );
}

export default CompletionPage;
