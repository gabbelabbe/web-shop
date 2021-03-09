import React from 'react'
import Routes from './routes/Routes'
import { UserProvider } from './shared/provider/UserProvider'
import { StarWarsProvider } from './shared/provider/StarWarsProvider'
import { ProductsProvider } from './shared/provider/ProductsProvider'
import './shared/styles/style.css'

function App() {
  return (
    <ProductsProvider>
      <StarWarsProvider>
        <UserProvider>
          <Routes />
        </UserProvider>
      </StarWarsProvider>
    </ProductsProvider>
  )
}

export default App
