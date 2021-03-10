import Axios from 'axios'
import { iloginCredentials, iProduct, iStarWarsCharacters } from '../interface/states'

const axiosInstance = Axios.create({
  withCredentials: true
})
const baseStarWarsUrl = 'https://swapi.dev/api/'
const baseUrl = process.env.REACT_APP_SERVER_BASE_URL

export const getPerson = (id: number | string): Promise<iStarWarsCharacters> => {
  return axiosInstance.get(baseStarWarsUrl + 'people/' + id + '/')
    .then(res => res.data)
    .catch(err => console.error(err))
}

export const getMoreInfo = (url: string) => {
  return axiosInstance.get(url)
    .then(res => res.data)
    .catch(err => console.error(err))
}

export const signUp = (email: string, username: string, password: string) => {
  return axiosInstance.post(baseUrl + 'user/create', {email, username, password})
    .then(res => res)
    .catch(err => console.error(err))
}

export const signIn = (username: string, password: string) => {
  return axiosInstance.post(baseUrl + 'user/login', {username, password})
    .then(res => res)
    .catch(err => console.error(err))
}

export const getAllUsers = () => {
  return axiosInstance.get(baseUrl + 'users')
    .then(res => res)
    .catch(err => console.error(err))
}

export const getAllProducts = () => {
  return axiosInstance.get(baseUrl + 'products')
    .then(res => res)
    .catch(err => console.error(err))
}

export const createProduct = (productInfo: iProduct) => {
  return axiosInstance.post(baseUrl + 'product', {...productInfo})
    .then(res => res)
    .catch(err => console.error(err))
}

export const updateProduct = (productInfo: iProduct) => {
  return axiosInstance.put(baseUrl + 'product', {...productInfo})
    .then(res => res)
    .catch(err => console.error(err))
}

export const deleteProduct = (_id: string) => {
  return axiosInstance.delete(baseUrl + 'product', { data: {_id: _id} })
    .then(res => res)
    .catch(err => console.error(err))
}

export const updateUser = (userInfo: iloginCredentials) => {
  return axiosInstance.put(baseUrl + 'user/change', {...userInfo})
    .then(res => res)
    .catch(err => console.error(err))
}
