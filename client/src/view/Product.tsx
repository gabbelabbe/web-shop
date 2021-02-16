import { useContext, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { iStarWarsCharacters } from "../shared/interface/states"
import { StarWarsContext } from '../shared/provider/StarWarsProvider'

interface MatchParams {
  id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
  params: MatchParams
}

export const Product = ({ match }: {match: MatchProps }) => {
  const [starWarsCharacters, ] = useContext(StarWarsContext) as [iStarWarsCharacters[], React.Dispatch<React.SetStateAction<iStarWarsCharacters[]>>]
  const [starWarsCharacter, ] = useState<iStarWarsCharacters | undefined>(starWarsCharacters ? starWarsCharacters.filter((person) => person.id === parseInt(match.params.id))[0] : undefined)

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