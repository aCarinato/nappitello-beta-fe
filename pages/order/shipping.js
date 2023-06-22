// react / next
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// components
import ShippingForm from '../../components/Purchase/ShippingForm';
import UserRoute from '../../components/Routes/UserRoute';

function ShippingPage() {
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (locale === 'it') {
      router.push('/ordine/spedizione');
    }
  }, [locale]);

  return (
    <UserRoute>
      <div>
        <h1>Shipping Address</h1>
        <ShippingForm />
      </div>
    </UserRoute>
  );
}

export default ShippingPage;
