import { useContext } from "react"
import { iCart, iProduct } from "../../shared/interface/states"
import AddCart from '../../shared/images/add_shopping_cart-white-18dp.svg'
import { updateCart, updateQuantity } from "../../shared/api/apiHandler"
import { CartContext } from "../../shared/provider/CartProvider"
import './ProductCard.css'
import { UserContext } from "../../shared/provider/UserProvider"

export const ProductCard = ({_id, name, types, price, quantity}: iProduct) => {
  const [cart, setCart] = useContext(CartContext) as [iCart, React.Dispatch<React.SetStateAction<iCart>>]
  const [authUser, setAuthUser] = useContext(UserContext)

  const handleAddToCart = async () => {
    const productRes = await updateQuantity(_id!, -1)

    if (productRes && productRes.status === 200) {
      if (authUser) {
        // If user is logged in
        const res = await updateCart({quantity: 1, productID: _id})
        if (res && res.status === 200) {
          localStorage.setItem('cart', JSON.stringify(res.data))
          localStorage.setItem('user', JSON.stringify({...authUser, cart: {...res.data}}))
          setCart(res.data)
          setAuthUser({...authUser, cart: {...res.data}})
        }
      } else {
        // if user is logged out
        const temp = {...cart}
        if (temp.products) {
          const itemIndex = temp.products.findIndex(p => p.product?._id === _id)
    
          if (itemIndex > -1) {
            const productItem = temp.products[itemIndex]
            productItem.quantity! += 1
            temp.products[itemIndex] = productItem
          } else {
            temp.products.push({product: {_id: _id, name: name, types: types, price: price}, quantity: 1})
          }
        } else {
          temp.products = [{product: {_id: _id, name: name, types: types, price: price}, quantity: 1}]
        }
        localStorage.setItem('cart', JSON.stringify(temp))
        setCart(temp)
      }
    }
  }

  return (
    <div className='productCardContainer'>
      <h3>{name}</h3>
      <div className='productCardTypesContainer'>
        {
          types ? types.map((type) => <p className='productCardTypeText' key={type}>{type}</p>) : ''
        }
      </div>
      <p>{price} kr</p>
      <p>{quantity} st</p>
      <div className='productCardButtonContainer'>
        {
          quantity && quantity > 0 ? <img src={AddCart} alt='Add to cart' onClick={() => handleAddToCart()} className='productCardIcon' /> : <p>There are no more of this product :(</p>
        }
      </div>
    </div>
  )
}