import Axios from 'axios'
import { iStarWarsCharacters } from '../interface/states'

const baseStarWarsUrl = 'https://swapi.dev/api/'
const baseUrl = 'http://localhost:3001/'

export const getPerson = (id: number | string): Promise<iStarWarsCharacters> => {
  return Axios.get(baseStarWarsUrl + 'people/' + id + '/')
    .then(res => res.data)
    .catch(err => console.error(err))
}

export const getMoreInfo = (url: string) => {
  return Axios.get(url)
    .then(res => res.data)
    .catch(err => console.error(err))
}

export const signUp = (email: string, username: string, password: string) => {
  return Axios.post(baseUrl + 'user/create', {email, username, password})
    .then(res => res)
    .catch(err => console.error(err))
}

export const signIn = (username: string, password: string) => {
  return Axios.post(baseUrl + 'user/login', {username, password})
    .then(res => res)
    .catch(err => console.error(err))
}

export const getAllUsers = () => {
  return Axios.get(baseUrl + 'users')
    .then(res => res)
    .catch(err => console.error(err))
}
