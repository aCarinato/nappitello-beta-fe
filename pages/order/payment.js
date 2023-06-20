// react / next
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// components
import Payment from '../../components/Payment/Payment';
// context
import { Store } from '../../context/Store';

function PymentPage() {
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const [totalPrice, setTotalPrice] = useState(null);

  // function to round to 2 decimals
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  //   console.log(itemsPrice);

  useEffect(() => {
    setTotalPrice(itemsPrice);
  }, [itemsPrice]);

  //   console.log(`totalPrice: ${totalPrice}`);

  // routing
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (locale === 'it') {
      router.push('/ordine/pagamento');
    }
    // if (locale === 'de') {
    //   router.push('/wagen');
    // }
  }, [locale]);

  return <div>{totalPrice && <Payment totalPrice={totalPrice} />}</div>;
}

export default PymentPage;
