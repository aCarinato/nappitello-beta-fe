// react / next
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// components
import AdminRoute from '../../../../components/Routes/AdminRoute';
import SpinningLoader from '../../../../components/UI/SpinningLoader';
import AdminProductImgGallery from '../../../../components/UI/Images/AdminProductImgGallery';
// libs
import axios from 'axios';
import APIError from '../../../../components/UI/APIError';

function AdminProductPage() {
  const router = useRouter();
  const { id } = router.query;
  // console.log(id);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  // error
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/products/product/${id}`
      );
      if (res.data.success) {
        setProduct(res.data.product);
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
    if (id) getProduct();
  }, [id]);

  console.log(product);

  return (
    <>
      {loading ? (
        <SpinningLoader />
      ) : isError ? (
        <APIError />
      ) : (
        <>
          <h1>Pagina prodotto</h1>
          {product && (
            <>
              {' '}
              <h1>{product.product.nameIT}</h1>
              <h2>Immagini</h2>
              <AdminProductImgGallery images={product.imagesUrls} />
              <div></div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default AdminProductPage;
