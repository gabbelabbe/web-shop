import { useState } from 'react'
import { iProduct } from '../../../shared/interface/states'
import './CreateProductForm.css'

export const CreateProductForm = () => {
  const [productInfo, setProductInfo] = useState<iProduct>({name: '', types: [], price: 0, quantity: 0})

  const handleChange = (newState: iProduct) => {
    setProductInfo({...productInfo, ...newState})
  }

  const handleClear = () => {
    setProductInfo({name: '', types: [], price: 0, quantity: 0})
  }

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

      {/* <input 
        type="checkbox" 
        name="" 
        id=""
        onChange={event => handleChange({username: event.target.value})} 
      /> */}

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
        <button onClick={handleClear} className='adminProductBtn'>Clear</button>
        <button onClick={() => console.log('product created :))')} className='adminProductBtn'>Create Product</button>
      </div>
    </div>
  )
}