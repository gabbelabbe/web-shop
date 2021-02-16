import { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Footer } from "../components/footer/Footer"
import { Header } from "../components/header/Header"
import { About } from "../view/About"
import { Home } from "../view/Home"
import { SignInView } from "../view/SignInView"
import RoutingPaths from './RoutingPath'
import { UserContext } from '../shared/provider/UserProvider'
import { Profile } from '../view/Profile'
import { Products } from '../view/Products'
import { Cart } from '../view/Cart'
import { Product } from '../view/Product'

const Routes = () => {
  const [authUser, setAuthUser] = useContext(UserContext)

  useEffect(() => {
    if(!authUser && localStorage.getItem('user')) {
      setAuthUser(JSON.parse(localStorage.getItem('user')!))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const routeHandler = (signedInView: React.FC, signedOutView: React.FC) => {
    return !authUser ? signedOutView : signedInView
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={RoutingPaths.aboutView} component={About} />
        <Route exact path={[RoutingPaths.signInView, RoutingPaths.signUpView]} component={routeHandler(Home, SignInView)} />
        <Route exact path={RoutingPaths.profileView} component={routeHandler(Profile, Home)} />
        <Route exact path={RoutingPaths.productView} component={Products} />
        <Route exact path={RoutingPaths.cartView} component={Cart} />
        <Route path={RoutingPaths.productView + '/:id'} component={Product} />
        <Route component={Home} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default Routes