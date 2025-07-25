import AllProducts from '../AllProducts'
import PrimeDeals from '../PrimeDeals'

import Header from '../Header'

import './index.css'

const Products = () => (
  <>
    <Header />
    <div className="product-sections">
      <PrimeDeals />
      <AllProducts />
    </div>
  </>
)

export default Products
