import { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Footer } from "../components/footer/Footer"
import { Header } from "../components/header/Header"
import { About } from "../view/About"
import { Home } from "../view/Home"
import { SignInView } from "../view/SignInView"
import RoutingPaths from './RoutingPath'
import { UserContext } from '../shared/provider/UserProvider'
import { Profile } from '../view/profile/Profile'
import { Products } from '../view/Products'
import { Cart } from '../view/cartContainer/Cart'
import { ProductsContext } from '../shared/provider/ProductsProvider'
import { createSession, getAllProducts } from "../shared/api/apiHandler"
import { Admin } from '../view/admin/Admin'
import { CartContext } from '../shared/provider/CartProvider'

const Routes = () => {
  const [authUser, setAuthUser] = useContext(UserContext)
  const [, setProducts] = useContext(ProductsContext)
  const [cart, setCart] = useContext(CartContext)

  useEffect(() => {
    const fetchProducts = async () => {
      const temp = await getAllProducts()
      if (temp && temp.data)
        setProducts(temp.data)
    }

    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser, cart])

  useEffect(() => {
    const initSession = async () => {
      const user = JSON.parse(localStorage.getItem('user')!)
      const res = await createSession(user)
      if (res && res.status === 200) {
        setAuthUser(user)
        setCart(user.cart)
      }
    }

    if(!authUser && localStorage.getItem('user')) {
      initSession()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(!cart && localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem('cart')!))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={RoutingPaths.aboutView} component={About} />
        <Route exact path={[RoutingPaths.signInView, RoutingPaths.signUpView]} component={!authUser ? SignInView : Home} />
        <Route exact path={RoutingPaths.profileView} component={authUser ? Profile : Home} />
        <Route exact path={RoutingPaths.productView} component={Products} />
        <Route exact path={RoutingPaths.cartView} component={Cart} />
        <Route exact path={RoutingPaths.adminView} component={authUser && authUser.userType === 'admin' ? Admin : Home} />
        <Route component={Home} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default Routes