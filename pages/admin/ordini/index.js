// react / next
import { useState, useEffect } from 'react';
// libs
import axios from 'axios';
// context
import { useMainContext } from '../../../context/User';
// components
import AdminRoute from '../../../components/Routes/AdminRoute';
import OrderCard from '../../../components/Admin/OrderCard';

function AdminOrdersPage() {
  const { authState } = useMainContext();

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/orders/get-all-orders`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      //   console.log(res.data);
      if (res.data.success) setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authState && authState.token.length > 0) getAllOrders();
  }, [authState]);

  return (
    <AdminRoute>
      <div>
        <h1>Ordini</h1>
        <div>
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    </AdminRoute>
  );
}

export default AdminOrdersPage;
