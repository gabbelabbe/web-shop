import { useContext, useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { iStarWarsCharacters } from "../shared/interface/states"
import { StarWarsContext } from '../shared/provider/StarWarsProvider'
import { getMoreInfo, getPerson } from "../shared/api/apiHandler"

interface MatchParams {
  id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
  params: MatchParams
}

export const Product = ({ match }: {match: MatchProps }) => {
  const [starWarsCharacters, setStarWarsCharacters] = useContext(StarWarsContext) as [iStarWarsCharacters[], React.Dispatch<React.SetStateAction<iStarWarsCharacters[]>>]
  const [starWarsCharacter, setStarWarsCharacter] = useState<iStarWarsCharacters | undefined>()

  useEffect(() => {
    if (starWarsCharacters.length) {
      setStarWarsCharacter(starWarsCharacters.filter((person) => person.id === parseInt(match.params.id))[0])
    } else {
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
  
      fetchPeople()
    }
    // eslint-disable-next-line
  }, [starWarsCharacters])

  return (
    <div>
      {
        starWarsCharacter ? (
          <div>
            <h1>Name: {starWarsCharacter?.name}</h1>
            <h3>Brith year: {starWarsCharacter?.birth_year}</h3>
            <h3>Home world: {starWarsCharacter?.homeworld.name}</h3>
            <h3>Height: {starWarsCharacter?.height}cm</h3>
            <h3>Appears in:</h3>
            <ul>
              {
                starWarsCharacter?.films.map((movie) => {
                  return (
                    <li>{movie.title}</li>
                  )
                })
              }
            </ul>
          </div>
        ) : (
          starWarsCharacters.length ? (
            <h1>No character with this id :((</h1>
          ) : (
            <div>
              <h1>No charachers have been loaded in, getting all the characters. Stay put!</h1>
            </div>
          )
        )
      }
    </div>
  )
}