// react / next
import { useRouter } from 'next/router';
// styles
import classes from './CartList.module.css';
// components
import BtnCTA from '../UI/BtnCTA';
// libs
import { Icon } from '@iconify/react';
// context
import { useMainContext } from '../../context/User';

function CartList(props) {
  const { authState } = useMainContext();

  const router = useRouter();
  const { locale } = router;

  const { items, removeItem, updateItem } = props;

  const checkoutHandler = () => {
    if (authState !== null && authState.token !== '') {
      if (locale === 'en') router.push('/payment');
      if (locale === 'it') router.push('/pagamento');
      if (locale === 'de') router.push('/betalen');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className={classes['main-container-flex']}>
      <div className={classes['main-container-flex-item70']}>
        <div className={classes['flex-row']}>
          <div className={classes['flex-row-item']}>
            {locale === 'en'
              ? 'Item'
              : locale === 'it'
              ? 'Articolo'
              : 'Artikel'}
          </div>
          <div className={classes['flex-row-item']}>
            {locale === 'en'
              ? 'Quantity'
              : locale === 'it'
              ? 'Quantità'
              : 'Anzahl'}
          </div>
          <div className={classes['flex-row-item']}>
            {locale === 'en'
              ? 'Price €'
              : locale === 'it'
              ? 'Prezzo €'
              : 'Preis €'}
          </div>
          <div className={classes['flex-row-item']}>
            {' '}
            {locale === 'en' ? 'Action' : locale === 'it' ? 'Azione' : 'Aktion'}
          </div>
        </div>
        {items.map((item) => (
          <div key={item._id} className={classes['flex-row']}>
            <div className={classes['flex-row-item']}>{item.nameEN}</div>
            <div className={classes['flex-row-item']}>
              <select
                value={item.quantity}
                onChange={(e) => updateItem(item, e.target.value)}
              >
                {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes['flex-row-item']}>{item.price}</div>
            <div className={classes['flex-row-item']}>
              <Icon
                className={classes.icon}
                icon="gridicons:cross-circle"
                onClick={() => removeItem(item)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={classes['main-container-flex-item30']}>
        <div>
          {locale === 'en' ? 'Total' : locale === 'it' ? 'Totale' : 'Gesamt'} (
          {items.reduce((a, c) => a + c.quantity, 0)}) : €
          {items.reduce((a, c) => a + c.quantity * c.price, 0)}
        </div>
        <div>
          <BtnCTA
            label="Check Out"
            onClickAction={checkoutHandler}
            icon={true}
            iconType="bi:cart"
          />
        </div>
      </div>
    </div>
  );
}

export default CartList;
