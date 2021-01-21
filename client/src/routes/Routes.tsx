import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Footer } from "../components/footer/Footer"
import { Header } from "../components/header/Header"
import { About } from "../view/About"
import { Home } from "../view/Home"
import { SignInView } from "../view/SignInView"
import RoutingPaths from './RoutingPath'

const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={RoutingPaths.aboutView} component={About} />
        <Route exact path={RoutingPaths.signInView} component={SignInView} />
        <Route component={Home} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default Routes