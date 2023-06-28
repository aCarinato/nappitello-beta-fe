import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

  const [customer, setCustomer] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  //   console.log(id);

  const retrieveOrder = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/orders/get-order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      if (res.data.success) setOrder(res.data.order);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authState && authState.token.length > 0 && id && id.length > 0)
      retrieveOrder();
  }, [authState, id]);

  const retrieveCustomer = async () => {
    setLoading(true);
    try {
      const customerId = order.user;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/customers/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      if (res.data.success) setCustomer(res.data.customer);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authState && authState.token.length > 0 && order) retrieveCustomer();
  }, [authState, order]);

  const fulfillOrder = async () => {
    setLoading(true);

    try {
      // console.log(authState.token);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/orders/fulfill-order`,
        { orderId: id, customer: customer },
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

  // console.log(customer);

  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : (
        <div>
          {customer && (
            <div>
              <p>
                Ordine effettuato da:{' '}
                <strong>
                  {customer.name} {customer.surname}
                </strong>
              </p>
              <br></br>
            </div>
          )}
          {order && (
            <div>
              <p>
                <strong>ID ordine:</strong> {order._id}
              </p>
              <br></br>
            </div>
          )}
          <BtnCTA label="Notifica Spedizione" onClickAction={fulfillOrder} />
        </div>
      )}
    </>
  );
}

export default OrderIdPage;
