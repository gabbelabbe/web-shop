import { useContext, useEffect, useState } from "react"
import { iCart } from "../../shared/interface/states"
import { CartContext } from "../../shared/provider/CartProvider"
import { ItemInfo } from "./itemInfo/ItemInfo"
import './CartContent.css'

export const CartContent = () => {
  const [cart,] = useContext(CartContext) as [iCart, React.Dispatch<React.SetStateAction<iCart>>]
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    if (cart && cart.products) {
      let priceTogheter = 0
      for (const product of cart.products) {
        priceTogheter += product.product?.price! * product.quantity!
      }

      setTotalPrice(priceTogheter)
    }
  }, [cart])

  return (
    <>
      {
        cart && cart.products?.length ? (
          <div className='cartContentContainer'>
            {cart.products.map(product => {
              return (
                <ItemInfo product={product} />
              )
            })}
            <h3>Total: {totalPrice}:-</h3>
          </div>
        ) : (
          <h1>Cart is Empty!</h1>
        )
      }
    </>
  )
}