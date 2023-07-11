// react/next
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// components
import CustomerOrder from '../../../components/Orders/CustomerOrder';
import SpinningLoader from '../../../components/UI/SpinningLoader';
// context
import { useMainContext } from '../../../context/User';
// libs
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { Document, Page } from 'react-pdf';
import axios from 'axios';
// data
import logoImage from '../../../public/images/logo/logo-social.png';

function OrdiniPage() {
  const { authState } = useMainContext();

  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (locale === 'en') router.push('/profile/orders');
  }, [locale]);

  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCustomerOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/orders/get-customer-orders`,
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      console.log(data);
      if (data.success) {
        setOrders(data.orders);
      } else {
        return;
      }
      //   return;
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authState && authState.token.length > 0) getCustomerOrders();
  }, [authState]);

  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : (
        <div>
          <h1>I miei ordini</h1>
          <br></br>
          {orders &&
            orders.map((order) => (
              <CustomerOrder key={order._id} order={order} />
            ))}
          {/* <button onClick={generatePDF}>Generate PDF</button> */}
        </div>
      )}
    </>
  );
}

export default OrdiniPage;
