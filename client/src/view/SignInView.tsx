import { useState, useContext } from 'react'
import { iloginCredentials } from '../shared/interface/states'
import { useHistory } from 'react-router-dom'
import RoutingPath from '../routes/RoutingPath'
import { UserContext } from '../shared/provider/UserProvider'

export const SignInView = () => {
  const history = useHistory()
  const [loginCredentials, setLoginCredentials] = useState<iloginCredentials>({username: '', password: ''})
  const [authUser, setAuthUser] = useContext(UserContext)

  const handleSignIn = () => {
    localStorage.setItem('user', loginCredentials.username)
    setAuthUser(loginCredentials)
    history.push(RoutingPath.homeView)
  }

  const handleChange = (newState: {username?: string, password?: string}) => {
    setLoginCredentials({...loginCredentials, ...newState})
  }

  return (
    <div>
      <form>
        <input 
          type="text" 
          placeholder='username' 
          onChange={event => handleChange({username: event.target.value})} 
          /> <br />
        <input 
          type="password" 
          placeholder='password' 
          onChange={event => handleChange({password: event.target.value})} 
        />

        <button onClick={handleSignIn}>Sign in</button>
      </form>
    </div>
  )
}