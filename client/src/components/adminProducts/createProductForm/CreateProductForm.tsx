import { useEffect, useState, useContext } from 'react'
import { createProduct, updateProduct } from '../../../shared/api/apiHandler'
import { iProduct } from '../../../shared/interface/states'
import './CreateProductForm.css'
import { ProductsContext } from '../../../shared/provider/ProductsProvider'

export const CreateProductForm = (
  { selectedProduct, setSelectedProduct }: 
  { selectedProduct: iProduct | undefined, setSelectedProduct: React.Dispatch<React.SetStateAction<iProduct | undefined>>}
) => {
  const [productInfo, setProductInfo] = useState<iProduct>({name: '', types: [], price: 0, quantity: 0})
  const [products, setProducts] = useContext(ProductsContext) as [iProduct[], React.Dispatch<React.SetStateAction<iProduct[]>>]

  const handleChange = (newState: iProduct) => {
    setProductInfo({...productInfo, ...newState})
  }

  const handleClear = () => {
    setProductInfo({name: '', types: [], price: 0, quantity: 0})
    setSelectedProduct(undefined)
  }

  const handleCreateProduct = async () => {
    if (!productInfo._id) {
      const res = await createProduct(productInfo)
      if (res && res.status === 201) {
        setProducts([...products, res.data])
        handleClear()
      }
    } else {
      const res = await updateProduct(productInfo)
      if (res && res.status === 200) {
        setProducts([...products.filter((p) => productInfo._id !== p._id), productInfo])
        handleClear()
      }
    }
  }

  useEffect(() => {
    if (selectedProduct)
      setProductInfo(selectedProduct)
  }, [selectedProduct])

  return (
    <div className='productForm'>
      <label htmlFor="name">
        Product Name
      </label>
      <input 
        type="text" 
        name="name" 
        id="name" 
        className='productInput'
        onChange={event => handleChange({name: event.target.value})}
        value={productInfo.name}
      />

      <label htmlFor="types">
        Product Types
      </label>
      <input 
        type="text" 
        name="types" 
        id="types" 
        className='productInput'
        onChange={event => handleChange({types: event.target.value.split(' ')})}
        value={productInfo.types?.join(' ')}
      />

      <label htmlFor="price">
        Product Price
      </label>
      <input 
        type="number" 
        name="price" 
        id="price" 
        min={0} 
        className='productInput'
        onChange={event => handleChange({price: parseInt(event.target.value)})}
        value={productInfo.price}
      />

      <label htmlFor="quantity">
        Product Quantity
      </label>
      <input 
        type="number" 
        name="quantity" 
        id="quantity" 
        min={0} 
        className='productInput'
        onChange={event => handleChange({quantity: parseInt(event.target.value)})}
        value={productInfo.quantity}
      />

      <div className='adminBtnContainer'>
        <button onClick={handleCreateProduct} className='adminProductBtn'>{productInfo._id ? 'Edit' : 'Create'}</button>
        <button onClick={handleClear} className='adminProductBtn danger'>Clear</button>
      </div>
    </div>
  )
}