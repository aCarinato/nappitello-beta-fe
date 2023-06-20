// react / next
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// components
import ShippingForm from '../../components/Purchase/ShippingForm';

function SpedizionePage() {
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (locale === 'en') {
      router.push('/order/shipping');
    }
  }, [locale]);

  return (
    <div>
      <h1>Indirizzo di spedizione</h1>
      <ShippingForm />
    </div>
  );
}

export default SpedizionePage;
