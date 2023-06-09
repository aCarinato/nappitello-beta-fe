// react / next
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
// components
import CartList from '../../components/Purchase/CartList';
//
import { Store } from '../../context/Store';
import Link from 'next/link';

function WagenPage() {
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    // const { data } = await axios.get(`/api/products/${item._id}`);
    // if (data.countInStock < quantity) {
    //   return toast.error('Sorry. Product is out of stock');
    // }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    // toast.success('Product updated in the cart');
  };

  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (locale === 'en') {
      router.push('/cart');
    }
    if (locale === 'it') {
      router.push('/carrello');
    }
  }, [locale]);

  return (
    <>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Einkaufswagen ist leer. Gehen Sie zur <Link href="/">Startseite</Link>
        </div>
      ) : (
        <CartList
          items={cartItems}
          removeItem={removeItemHandler}
          updateItem={updateCartHandler}
        />
      )}
    </>
  );
}

export default WagenPage;
