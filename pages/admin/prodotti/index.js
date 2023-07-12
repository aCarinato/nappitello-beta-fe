// react / next
import Link from 'next/link';
import { useEffect, useState } from 'react';
// components
import AdminRoute from '../../../components/Routes/AdminRoute';
import APIError from '../../../components/UI/APIError';
// libs
import axios from 'axios';
import SpinningLoader from '../../../components/UI/SpinningLoader';

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // error
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/products`);
      if (res.data.success) {
        setProducts(res.data.products);
        console.log(res.data);
      } else {
        setIsError(true);
        setErrorMsg(res.data.error);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(products);

  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : isError ? (
        <APIError errorMsg={errorMsg} setIsError={setIsError} />
      ) : (
        <div>
          <div>
            <Link href="/admin/prodotti/nuovo">Crea nuovo prodotto</Link>
          </div>

          <br></br>
          <div>
            <h1>Prodotti</h1>
          </div>
          {products &&
            products.map((product) => (
              <div key={product._id}>
                <Link href={`/admin/prodotti/${product._id}`}>
                  {product.nameIT}
                </Link>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default AdminProductsPage;
