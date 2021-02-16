import Axios from 'axios'
import { iStarWarsCharacters } from '../interface/states'

const baseUrl = 'https://swapi.dev/api/'

export const getPerson = (id: number | string): Promise<iStarWarsCharacters> => {
  return Axios.get(baseUrl + 'people/' + id + '/')
    .then(res => res.data)
    .catch(err => console.error(err))
}

export const getMoreInfo = (url: string) => {
  return Axios.get(url)
    .then(res => res.data)
    .catch(err => console.error(err))
}
