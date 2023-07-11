// react / next
import Link from 'next/link';
import { useRouter } from 'next/router';
// styles
import classes from './CustomerOrder.module.css';

// components
// import BtnCTA from './';

function CustomerOrder(props) {
  const { order } = props;

  const router = useRouter();
  const { locale } = router;

  let hrefOrder =
    locale === 'it'
      ? `/profilo/ordini/${order._id}`
      : `/profile/orders/${order._id}`;

  return (
    <div className={classes['box-0']}>
      <p>
        <strong>{locale === 'it' ? 'Spedizione' : 'Shipping'}:</strong>{' '}
        <span
          className={order.isShipped ? classes['isTrue'] : classes['isFalse']}
        >
          {order.isShipped && locale === 'it'
            ? 'Spedito'
            : !order.isShipped && locale === 'it'
            ? 'Da spedire'
            : order.isShipped && locale === 'en'
            ? 'Shipped'
            : 'Shipment pending'}
        </span>
      </p>
      <Link href={hrefOrder}>
        {locale === 'it' ? 'Vedi ordine' : 'View order'}
      </Link>
    </div>
  );
}

export default CustomerOrder;
