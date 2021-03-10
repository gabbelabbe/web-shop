import React from 'react'
import Routes from './routes/Routes'
import { UserProvider } from './shared/provider/UserProvider'
import { ProductsProvider } from './shared/provider/ProductsProvider'
import './shared/styles/style.css'

function App() {
  return (
    <ProductsProvider>
        <UserProvider>
          <Routes />
        </UserProvider>
    </ProductsProvider>
  )
}

export default App
