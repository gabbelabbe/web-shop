import { useContext } from "react"
import { ProductsContext } from "../../../shared/provider/ProductsProvider"
import { AdminProductCard } from "./adminProductCard/AdminProductCard"
import { iProduct } from "../../../shared/interface/states"
import './ProductList.css'

export const ProductList = (
  { setSelectedProduct }: 
  { setSelectedProduct: React.Dispatch<React.SetStateAction<iProduct | undefined>>}
) => {
  const [products] = useContext(ProductsContext) as [iProduct[], React.Dispatch<React.SetStateAction<iProduct[]>>]

  return (
    <div className='productList'>
      {
        products.map(product => {
          return (
            <AdminProductCard product={product} setSelectedProduct={setSelectedProduct} />
          )
        })
      }
    </div>
  )
}