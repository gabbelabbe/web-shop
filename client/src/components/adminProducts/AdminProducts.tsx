import { CreateProductForm } from "./createProductForm/CreateProductForm"
import { ProductList } from "./productList/ProductList"
import './AdminProducts.css'
import { useState } from "react"
import { iProduct } from "../../shared/interface/states"

export const AdminProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<iProduct | undefined>()

  return (
    <div className='adminProductsContainer'>
      <CreateProductForm selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
      <ProductList setSelectedProduct={setSelectedProduct} />
    </div>
  )
}