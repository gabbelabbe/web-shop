import Routes from './routes/Routes'
import { UserProvider } from './shared/provider/UserProvider'
import { ProductsProvider } from './shared/provider/ProductsProvider'
import { CartProvider } from './shared/provider/CartProvider'
import './shared/styles/style.css'

function App() {
  return (
    <CartProvider>
      <ProductsProvider>
          <UserProvider>
            <Routes />
          </UserProvider>
      </ProductsProvider>
    </CartProvider>
  )
}

export default App
