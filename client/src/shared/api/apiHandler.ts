import Axios from 'axios'
import { iloginCredentials, iProduct } from '../interface/states'

Axios.defaults.withCredentials = true
const baseUrl = process.env.REACT_APP_SERVER_BASE_URL


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

export const signOut = () => {
  return Axios.post(baseUrl + 'user/logout')
    .then(res => res)
    .catch(err => console.error(err))
}

export const getAllUsers = () => {
  return Axios.get(baseUrl + 'users')
    .then(res => res)
    .catch(err => console.error(err))
}

export const getAllProducts = () => {
  return Axios.get(baseUrl + 'products')
    .then(res => res)
    .catch(err => console.error(err))
}

export const createProduct = (productInfo: iProduct) => {
  return Axios.post(baseUrl + 'product', {...productInfo})
    .then(res => res)
    .catch(err => console.error(err))
}

export const updateProduct = (productInfo: iProduct) => {
  return Axios.put(baseUrl + 'product', {...productInfo})
    .then(res => res)
    .catch(err => console.error(err))
}

export const deleteProduct = (_id: string) => {
  return Axios.delete(baseUrl + 'product', { data: {_id: _id} })
    .then(res => res)
    .catch(err => console.error(err))
}

export const updateUser = (userInfo: iloginCredentials) => {
  return Axios.put(baseUrl + 'user/change', {...userInfo})
    .then(res => res)
    .catch(err => console.error(err))
}
