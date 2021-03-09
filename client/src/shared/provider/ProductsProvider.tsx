import { useState, createContext } from 'react'
import { iProvider } from '../interface/props'
import { iProduct } from '../interface/states'

export const ProductsContext = createContext<any>(null)

export const ProductsProvider = ({children}: iProvider) => {
  const [products, setProducts] = useState<iProduct[]>([])

  return (
    <ProductsContext.Provider value={[products, setProducts]}>
      {children}
    </ProductsContext.Provider>
  )
}