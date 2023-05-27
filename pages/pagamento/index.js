// react / next
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// components
import Payment from '../../components/Payment';
// context
import { Store } from '../../context/Store';

function PagamentoPage() {
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const [totalPrice, setTotalPrice] = useState('0');

  //   if (cart) console.log(cart);
  console.log(state.cart);

  // routing
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (locale === 'en') {
      router.push('/payment');
    }
    if (locale === 'de') {
      router.push('/wagen');
    }
  }, [locale]);

  return <div>{/* <Payment totalPrice={totalPrice} /> */}</div>;
}

export default PagamentoPage;
