import { iProduct } from "../../shared/interface/props"
import './ProductCard.css'

export const ProductCard = ({id, imgs, title, text, type}: iProduct) => {

  return (
    <div className='productCardContainer' onClick={() => console.log(id)}>
      <div style={{backgroundImage: `url(${imgs[0]})`}} className='img' />
      <div className='productCardContent'>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  )
}