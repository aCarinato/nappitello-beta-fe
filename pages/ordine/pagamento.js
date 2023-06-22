// react / next
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// components
import Payment from '../../components/Payment/Payment';
import UserRoute from '../../components/Routes/UserRoute';
// context
import { Store } from '../../context/Store';

function PagamentoPage() {
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
    if (locale === 'en') {
      router.push('/order/payment');
    }
    // if (locale === 'de') {
    //   router.push('/wagen');
    // }
  }, [locale]);

  return (
    <UserRoute>
      <div>{totalPrice && <Payment totalPrice={totalPrice} />}</div>
    </UserRoute>
  );
}

export default PagamentoPage;
