import { useState } from "react"
import { ProductCard } from "../components/product/ProductCard"
import { iProduct } from "../shared/interface/props"

export const Products = () => {
  const [products, setProducts] = useState<iProduct[]>([{
    id: '', 
    imgs: ['https://thispersondoesnotexist.com/image', 'https://thispersondoesnotexist.com/image', 'https://thispersondoesnotexist.com/image'], 
    title: '', 
    type: '', 
    text: ''
  }, 
  {
    id: '', 
    imgs: ['', '', ''], 
    title: '', 
    type: '', 
    text: ''
  }, 
  {
    id: '', 
    imgs: ['', '', ''], 
    title: '', 
    type: '', 
    text: ''
  }])

  return (
    <div className='productsContainer'>
      {
        products.map((product) => 
          <ProductCard 
            imgs={product.imgs} 
            title={product.title} 
            type={product.type} 
            text={product.text}
            id={product.id}
          />
        )
      }
    </div>
  )
}