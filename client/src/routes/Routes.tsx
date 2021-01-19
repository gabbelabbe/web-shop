import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Header } from "../components/header/Header"
import { About } from "../view/About"
import { Home } from "../view/Home"

const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/about' component={About} />
        <Route exact path='/' component={Home} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default Routes