import { useState, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ProductCard } from "../components/productCard/ProductCard"
import { getMoreInfo, getPerson } from "../shared/api/apiHandler"
import { iProduct } from "../shared/interface/props"
import { iStarWarsCharacters } from "../shared/interface/states"
import { StarWarsContext } from '../shared/provider/StarWarsProvider'
import RoutingPaths from '../routes/RoutingPath'

export const Products = () => {
  /* const [products, setProducts] = useState<iProduct[]>([{
    id: 'asdasfdsfgdfh', 
    imgs: [
      'https://images.unsplash.com/photo-1593642532454-e138e28a63f4?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', 
    ], 
    title: 'Coola Skor', 
    type: '',
    text: 'Spicy jalapeno bacon ipsum dolor amet elit tempor pancetta, aliquip nostrud filet mignon turducken tenderloin irure pork chop ut kielbasa. Est ut shankle mollit labore pork belly biltong id prosciutto pig sausage pork chop anim quis. Ipsum cupim filet mignon, meatloaf bacon boudin eu ground round in. Ham laborum jowl, anim burgdoggen salami non andouille. Anim commodo cillum mollit t-bone duis. Landjaeger proident incididunt quis pancetta exercitation elit enim porchetta laborum.'
  }, 
  {
    id: '', 
    imgs: [
      'https://images.unsplash.com/photo-1612214095397-d5f16300485b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
    ], 
    title: '', 
    type: '', 
    text: ''
  }, 
  {
    id: '', 
    imgs: [
      'https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    ], 
    title: '', 
    type: '', 
    text: ''
  }]) */

  const history = useHistory()
  const [starWarsCharacters, setStarWarsCharacters] = useContext(StarWarsContext) as [iStarWarsCharacters[], React.Dispatch<React.SetStateAction<iStarWarsCharacters[]>>]

  useEffect(() => {
    const fetchPeople = async () => {
      const temp: iStarWarsCharacters[] = []
      for (let i = 1; i < 84; i++) {
        let person = await getPerson(i)
        if (person) {
          const homeWorld = await getMoreInfo(person.homeworld)
          person.homeworld = homeWorld
          const movies = []
          for (let i = 0; i < person.films.length; i++) {
            const movie = await getMoreInfo(person.films[i])
            movies.push(movie)
          }
          person.films = movies
          person.id = i
          temp.push(person)
        }
      }
      setStarWarsCharacters(temp)
    }

    if (!starWarsCharacters.length)
      fetchPeople()
  }, [])

  return (
    <div className='productsContainer'>
      {
        starWarsCharacters.length ? 
        starWarsCharacters.map((person) => {
          return (
            <div className='starWarsCard' key={person.id} onClick={() => history.push(RoutingPaths.productView + '/' + person.id)}>
              <h3>Name: {person.name}</h3>
              <p>Brith year: {person.birth_year}</p>
              <p>Home world: {person.homeworld.name}</p>
              <p>Height: {person.height}cm</p>
              <p>Appears in:</p>
              <ul>
                {
                  person.films.map((movie) => {
                    return (
                      <li>{movie.title}</li>
                    )
                  })
                }
              </ul>
            </div>
          )
        }) : <h1>Loading!</h1>
      }
      {/* {
        products.map((product) => 
          <ProductCard 
            imgs={product.imgs} 
            title={product.title} 
            type={product.type} 
            text={product.text}
            id={product.id}
          />
        )
      } */}
    </div>
  )
}