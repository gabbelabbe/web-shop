import DeleteSVG from '../../../../shared/images/delete-white-18dp.svg'
import AddSVG from '../../../../shared/images/add-white-18dp.svg'
import RemoveSVG from '../../../../shared/images/remove-white-18dp.svg'
import { useContext } from 'react'
import { CartContext } from '../../../../shared/provider/CartProvider'
import { iCart, iCartProduct } from '../../../../shared/interface/states'
import './ItemInfoButtons.css'
import { UserContext } from '../../../../shared/provider/UserProvider'
import { updateCart, updateQuantity } from '../../../../shared/api/apiHandler'

export const ItemInfoButtons = ({ product }: { product: iCartProduct }) => {
  const [cart, setCart] = useContext(CartContext) as [iCart, React.Dispatch<React.SetStateAction<iCart>>]
  const [authUser, setAuthUser] = useContext(UserContext)


  const handleEditCart = async (quantity: number) => {
    if (authUser) {
      // If user is logged in
      const res = await updateCart({quantity: quantity, productID: product.product?._id})
      if (res && res.status === 200) {
        localStorage.setItem('cart', JSON.stringify(res.data))
        localStorage.setItem('user', JSON.stringify({...authUser, cart: {...res.data}}))
        setCart(res.data)
        setAuthUser({...authUser, cart: {...res.data}})
      }
    } else {
      const productRes = await updateQuantity(product.product?._id!, -quantity)
  
      if (productRes && productRes.status === 200) {
        // if user is logged out
        const temp = {...cart}
        if (temp.products) {
          const itemIndex = temp.products.findIndex(p => p.product?._id === product.product?._id)

          
          if (itemIndex > -1) {
            if (quantity + temp!.products![itemIndex]!.quantity! <= 0) {
              temp.products.splice(itemIndex, 1)
            } else {
              const productItem = temp.products[itemIndex]
              productItem.quantity! += quantity
              temp.products[itemIndex] = productItem
            }
            
          } else {
            temp.products.push({product: {_id: product.product?._id, name: product.product?.name, types: product.product?.types, price: product.product?.price}, quantity: quantity})
          }
        } else {
          temp.products = [{product: {_id: product.product?._id, name: product.product?.name, types: product.product?.types, price: product.product?.price}, quantity: quantity}]
        }
        localStorage.setItem('cart', JSON.stringify(temp))
        setCart(temp)
      }
    }
  }

  return (
    <div className='itemInfoButtonsContainer'>
      <img src={RemoveSVG} alt='Remove on from cart' onClick={() => handleEditCart(-1)} className='itemInfoButton delete' />
      <p>{product.quantity}</p>
      <img src={AddSVG} alt='Add one to cart' onClick={() => handleEditCart(1)} className='itemInfoButton add' />
      <img src={DeleteSVG} alt='Remove from cart' onClick={() => handleEditCart(-product.quantity!)} className='itemInfoButton delete' />
    </div>
  )
}