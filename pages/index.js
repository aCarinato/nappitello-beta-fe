// components
import ProductItem from '../components/Products/ProductItem';
// own data
import { products } from '../data/products';

function HomePage() {
  return (
    <div className="flex-space-between">
      {products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
}

export default HomePage;
