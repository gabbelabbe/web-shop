import { useState } from 'react'
import { loginCredentials } from '../shared/interface/states'
import { useHistory } from 'react-router-dom'
import RoutingPath from '../routes/RoutingPath'

export const SignInView = () => {
  const history = useHistory()
  const [loginCredentials, setLoginCredentials] = useState<loginCredentials>({userName: '', password: ''})

  const handleSignIn = () => {
    history.push(RoutingPath.homeView)
    localStorage.setItem('user', loginCredentials.userName)
  }

  return (
    <div>
      <form>
        <input 
          type="text" 
          placeholder='username' 
          onChange={event => setLoginCredentials({...loginCredentials, userName: event.target.value})} 
          /> <br />
        <input 
          type="password" 
          placeholder='password' 
          onChange={event => setLoginCredentials({...loginCredentials, password: event.target.value})} 
        />

        <button onClick={handleSignIn}>Sign in</button>
      </form>
    </div>
  )
}