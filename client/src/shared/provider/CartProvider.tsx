import { useState, createContext } from 'react'
import { iProvider } from '../interface/props'

export const CartContext = createContext<any>(null)

export const CartProvider = ({children}: iProvider) => {
  const [cart, setCart] = useState()

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  )
}