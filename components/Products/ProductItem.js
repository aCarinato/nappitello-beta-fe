// react / next
import { useRouter } from 'next/router';
import { useContext } from 'react';
// styles
import classes from './ProductItem.module.css';
// components
import BtnCTA from '../UI/BtnCTA';
// context
import { Store } from '../../context/Store';

function ProductItem(props) {
  const { product } = props;

  const router = useRouter();
  const { locale } = router;

  const { state, dispatch } = useContext(Store);

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      if (locale === 'en') alert('Sorry. Product out of stock');
      if (locale === 'it') alert('Prodotto esaurito');
      if (locale === 'de') alert('Es tut uns leid. Produkt nicht auf Lager');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  return (
    <div className={classes['box-0']}>
      {locale === 'en' && <h2>{product.nameEN}</h2>}
      {locale === 'it' && <h2>{product.nameIT}</h2>}
      {locale === 'de' && <h2>{product.nameDE}</h2>}
      <br></br>
      <BtnCTA
        label={
          locale === 'en'
            ? 'Add to Cart'
            : locale === 'it'
            ? 'Aggiungi al carrello'
            : 'Opladen naar kart'
        }
        onClickAction={addToCartHandler}
      />
    </div>
  );
}

export default ProductItem;
