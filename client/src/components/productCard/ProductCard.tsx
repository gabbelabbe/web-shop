import { iProduct } from "../../shared/interface/states"
import './ProductCard.css'

export const ProductCard = ({_id, name, types, price, quantity}: iProduct) => {

  return (
    <div className='productCardContainer' onClick={() => console.log(_id)}>
      <h3>{name}</h3>
      <div className='productCardTypesContainer'>
        {
          types ? types.map((type) => <p className='productCardTypeText' key={type}>{type}</p>) : ''
        }
      </div>
      <p>{price} kr</p>
      <p>{quantity} st</p>
    </div>
  )
}