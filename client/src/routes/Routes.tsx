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
import { Cart } from '../view/Cart'
import { Product } from '../view/Product'
import { ProductsContext } from '../shared/provider/ProductsProvider'
import { getAllProducts } from "../shared/api/apiHandler"
import { Admin } from '../view/admin/Admin'

const Routes = () => {
  const [authUser, setAuthUser] = useContext(UserContext)
  const [products, setProducts] = useContext(ProductsContext)

  useEffect(() => {
    const fetchProducts = async () => {
      const temp = await getAllProducts()
      if (temp && temp.data)
        setProducts(temp.data)
    }

    if (!products.length)
      fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser])

  useEffect(() => {
    if(!authUser && localStorage.getItem('user')) {
      setAuthUser(JSON.parse(localStorage.getItem('user')!))
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
        <Route path={RoutingPaths.productView + '/:id'} component={Product} />
        <Route component={Home} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default Routes