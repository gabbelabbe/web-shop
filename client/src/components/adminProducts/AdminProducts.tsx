import { CreateProductForm } from "./createProductForm/CreateProductForm"
import { ProductList } from "./productList/ProductList"
import './AdminProducts.css'

export const AdminProducts = () => {

  return (
    <div className='adminProductsContainer'>
      <CreateProductForm />
      <ProductList />
    </div>
  )
}