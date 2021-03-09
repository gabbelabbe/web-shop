import { useContext } from "react"
import { deleteProduct } from "../../../../shared/api/apiHandler"
import { iProduct } from "../../../../shared/interface/states"
import { ProductsContext } from "../../../../shared/provider/ProductsProvider"
import DeleteSVG from '../../../../shared/images/delete-white-18dp.svg'
import EditSVG from '../../../../shared/images/create-white-18dp.svg'
import './AdminProductCard.css'

export const AdminProductCard = (
  { product, setSelectedProduct }: 
  { product: iProduct, setSelectedProduct: React.Dispatch<React.SetStateAction<iProduct | undefined>> }
) => {
  const [products, setProducts] = useContext(ProductsContext) as [iProduct[], React.Dispatch<React.SetStateAction<iProduct[]>>]

  const handleDelete = async () => {
    const res = await deleteProduct(product._id!)
    if (res && res.status === 200) {
      setProducts(products.filter(p => p._id !== res.data._id))
    } else {
      window.alert('Something went wrong when trying to delete ' + product.name)
    }
  }

  return (
    <div className="adminProductCard">
      <h3>Name: {product.name}</h3>
      <ul>
        {
          product.types ? product.types.map((type) => <li>{type}</li>) : null
        }
      </ul>
      <h5>Price: {product.price}</h5>
      <h5>Quantity: {product.quantity}</h5>
      <div className='iconContainer'>
        <img src={EditSVG} alt='Edit' onClick={() => setSelectedProduct(product)} className='adminIcon edit' />
        <img src={DeleteSVG} alt='Delete' onClick={handleDelete} className='adminIcon delete' />
      </div>
    </div>
  )
}