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
import { StarWarsContext } from '../shared/provider/StarWarsProvider'
import { getMoreInfo, getPerson } from "../shared/api/apiHandler"
import { iStarWarsCharacters } from "../shared/interface/states"

const Routes = () => {
  const [authUser, setAuthUser] = useContext(UserContext)
  const [starWarsCharacters, setStarWarsCharacters] = useContext(StarWarsContext) as [iStarWarsCharacters[], React.Dispatch<React.SetStateAction<iStarWarsCharacters[]>>]

  useEffect(() => {
    const fetchPeople = async () => {
      const temp: iStarWarsCharacters[] = []
      for (let i = 1; i < 84; i++) {
        let person = await getPerson(i)
        if (person) {
          person.homeworld = person.homeworld.split('http')[0] ? person.homeworld : 'https' + person.homeworld.split('http')[1]
          const homeWorld = await getMoreInfo(person.homeworld)
          person.homeworld = homeWorld
          const movies = []
          for (let i = 0; i < person.films.length; i++) {
            person.films[i] = person.films[i].split('http')[0] ? person.films[i] : 'https' + person.films[i].split('http')[1]
            const movie = await getMoreInfo(person.films[i])
            movies.push(movie)
          }
          person.films = movies
          person.id = i
          temp.push(person)
        }
      }
      setStarWarsCharacters(temp)
      localStorage.setItem('starWarsCharacters', JSON.stringify(temp))
    }

    if (!starWarsCharacters.length && localStorage.getItem('starWarsCharacters')) {
      setStarWarsCharacters(JSON.parse(localStorage.getItem('starWarsCharacters')!))
    } else if (!starWarsCharacters.length) {
      fetchPeople()
    }
    
    // eslint-disable-next-line
  }, [])

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