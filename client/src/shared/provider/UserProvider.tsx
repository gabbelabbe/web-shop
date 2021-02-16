import { useState, createContext } from 'react'
import { iProvider } from '../interface/props'

export const UserContext = createContext<any>(null)

export const UserProvider = ({children}: iProvider) => {
  const [authUser, setAuthUser] = useState()

  return (
    <UserContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </UserContext.Provider>
  )
}