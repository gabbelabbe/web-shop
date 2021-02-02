import { iProduct } from "../../shared/interface/props"
import { Slider } from "./slider/Slider"
import './ProductCard.css'

export const ProductCard = ({id, imgs, title, text, type}: iProduct) => {

  return (
    <div className='productContainer'>
      <Slider imgs={imgs} />
    </div>
  )
}