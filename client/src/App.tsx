import React from 'react'
import { Home } from './pages/Home'
import { Header } from './components/Header'
import { About } from './pages/About'
import { Footer } from './components/Footer'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import './shared/styles/style.css'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
