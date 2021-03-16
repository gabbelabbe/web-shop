import { iCartProduct } from "../../../shared/interface/states"
import './ItemInfo.css'
import { ItemInfoButtons } from "./itemInfoButtons/ItemInfoButtons"

export const ItemInfo = ({ product }: { product: iCartProduct}) => {

  return (
    <div className='itemInfoContainer'>
      <div className='itemTextContainer'>
        <h3>{product.product?.name}</h3>
        <p>{product.product?.price}:-</p>
      </div>
      <ItemInfoButtons product={product} />
    </div>
  )
}