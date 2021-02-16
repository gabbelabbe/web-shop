import { useState, createContext } from 'react'
import { iProvider } from '../interface/props'
import { iStarWarsCharacters } from '../interface/states'

export const StarWarsContext = createContext<any>(null)

export const StarWarsProvider = ({children}: iProvider) => {
  const [starWarsCharacters, setStarWarsCharacters] = useState<iStarWarsCharacters[]>([])

  return (
    <StarWarsContext.Provider value={[starWarsCharacters, setStarWarsCharacters]}>
      {children}
    </StarWarsContext.Provider>
  )
}