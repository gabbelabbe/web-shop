import { useState, createContext } from 'react'
import { iAuthUser } from '../interface/props'

export const UserContext = createContext<any>(null)

export const UserProvider = ({children}: iAuthUser) => {
  const [authUser, setAuthUser] = useState()

  return (
    <UserContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </UserContext.Provider>
  )
}