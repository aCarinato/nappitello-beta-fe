// react / next
import { useContext, useEffect } from 'react';
// context
import { Store } from '../context/Store';

function CompletionPage() {
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

  return <div>Payment completed!</div>;
}

export default CompletionPage;
