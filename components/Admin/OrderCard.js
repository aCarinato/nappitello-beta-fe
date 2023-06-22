// react / next
import Link from 'next/link';
// styles
import classes from './OrderCard.module.css';
// components

function OrderCard(props) {
  const { order } = props;

  return (
    <div className={classes['box-0']}>
      <p>
        <strong>id:</strong> {order._id}
      </p>
      <br></br>
      <p>
        <strong>Indirizzo:</strong> {order.shippingAddress.address},{' '}
        {order.shippingAddress.city} - {order.shippingAddress.country}
      </p>
      <br></br>
      <p>
        <strong>Pagamento:</strong>{' '}
        {order.chargeSucceeded ? 'Pagato' : 'Pendente'}
      </p>
      <br></br>
      <p>
        <strong>Evasione:</strong>{' '}
        {order.isDelivered ? 'Spedito' : 'Da spedire'}
      </p>
      <br></br>
      <div>
        <Link href={`/admin/ordini/${order._id}`}>Gestisci ordine</Link>
      </div>
    </div>
  );
}

export default OrderCard;
