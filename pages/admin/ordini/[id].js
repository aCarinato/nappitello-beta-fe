import { useRouter } from 'next/router';
import { useState } from 'react';
// components
import BtnCTA from '../../../components/UI/BtnCTA';
import SpinningLoader from '../../../components/UI/SpinningLoader';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../../context/User';

function OrderIdPage() {
  const { authState } = useMainContext();
  // router
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  //   console.log(id);

  const fulfillOrder = async () => {
    setLoading(true);
    try {
      console.log(authState.token);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/orders/fulfill-order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      console.log(res.data);
      // if (res.data.success) setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : (
        <div>
          <BtnCTA label="Notifica Spedizione" onClickAction={fulfillOrder} />
        </div>
      )}
    </>
  );
}

export default OrderIdPage;
