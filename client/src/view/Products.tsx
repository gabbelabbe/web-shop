import { useContext } from 'react'
import { ProductCard } from '../components/productCard/ProductCard'
import { iProduct } from '../shared/interface/states'
import { ProductsContext } from '../shared/provider/ProductsProvider'

export const Products = () => {
  const [products] = useContext(ProductsContext) as [iProduct[], React.Dispatch<React.SetStateAction<iProduct[]>>]

  return (
    <div className='productsContainer'>
      {
        products.map((product) => 
          <ProductCard 
            name={product.name} 
            types={product.types} 
            _id={product._id}
            price={product.price}
            quantity={product.quantity}
          />
        )
      }
    </div>
  )
}