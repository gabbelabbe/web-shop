import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import RoutingPath from '../../../routes/RoutingPath'
import CartSVG from '../../../shared/images/shopping_cart-white-18dp.svg'
import { iCart } from '../../../shared/interface/states'
import { CartContext } from '../../../shared/provider/CartProvider'
import './CartIcon.css'

export const CartIcon = () => {
  const [totalQuantity, setTotalQuantity] = useState(0)
  const history = useHistory()
  const [cart,] = useContext(CartContext) as [iCart, React.Dispatch<React.SetStateAction<iCart>>]

  useEffect(() => {
    if (cart && cart.products) {
      let quantity = 0
      for (const product of cart.products) {
        quantity += product.quantity!
      }

      setTotalQuantity(quantity)
    } else {
      setTotalQuantity(0)
    }
  }, [cart])

  return (
    <div>
      <img src={CartSVG} alt='Cart Button' onClick={() => history.push(RoutingPath.cartView)} className='svgs' />
      {
        totalQuantity > 0 ? <span className='shoppingCartCounter'>{totalQuantity}</span> : ''
      }
    </div>
  )
}