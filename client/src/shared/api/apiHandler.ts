import Axios from 'axios'
import { iloginCredentials, iProduct, iStarWarsCharacters } from '../interface/states'

Axios.defaults.withCredentials = true
const baseStarWarsUrl = 'https://swapi.dev/api/'
const baseUrl = process.env.REACT_APP_SERVER_BASE_URL

export const getPerson = (id: number | string): Promise<iStarWarsCharacters> => {
  return fetch(baseStarWarsUrl + 'people/' + id + '/', { credentials: 'include' })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const getMoreInfo = (url: string) => {
  return Axios.get(url)
    .then(res => res.data)
    .catch(err => console.error(err))
}

export const signUp = (email: string, username: string, password: string) => {
  return fetch(baseUrl + 'user/create', 
    {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        email, 
        username, 
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }
  )
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const signIn = (username: string, password: string) => {
  return fetch(baseUrl + 'user/login', 
    {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        username, 
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }
  )
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const signOut = () => {
  return fetch(baseUrl + 'user/logout', 
    {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }
  )
    .then(res => res.json())
    .catch(err => console.error(err))
}

export const getAllUsers = () => {
  return fetch(baseUrl + 'users', 
    {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }
  )
    .then(res => res.json())
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
  return fetch(baseUrl + 'user/change', 
    {
      credentials: 'include',
      method: 'put',
      body: JSON.stringify({
        ...userInfo
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }
  )
    .then(res => res.json())
    .catch(err => console.error(err))
}
