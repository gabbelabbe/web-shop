import { useState, useContext, useEffect } from 'react'
import { iloginCredentials } from '../../shared/interface/states'
import { useHistory } from 'react-router-dom'
import RoutingPath from '../../routes/RoutingPath'
import { UserContext } from '../../shared/provider/UserProvider'
import './SignUp.css'

export const SignUp = () => {
  const history = useHistory()
  const [loginCredentials, setLoginCredentials] = useState<iloginCredentials>({username: '', email: '', password: ''})
  const [, setAuthUser] = useContext(UserContext)
  const [disabled, setDisabled] = useState(true)

  const handleSignUp = () => {
    if (loginCredentials.username && loginCredentials.email && loginCredentials.password) {
      localStorage.setItem('user', JSON.stringify({username: loginCredentials.username, email: loginCredentials.email}))
      setAuthUser(loginCredentials)
      history.push(RoutingPath.homeView)
    }
  }

  const handleChange = (newState: iloginCredentials) => {
    setLoginCredentials({...loginCredentials, ...newState})
  }
  
  useEffect(() => {
    setDisabled(!(!!loginCredentials.username && !!loginCredentials.password && !!loginCredentials.email))
  }, [loginCredentials])

  return (
    <div className='signInForm'>
      <label htmlFor="u">
        Username
      </label>
      <input 
        type="text" 
        name="u"
        onChange={event => handleChange({username: event.target.value})} 
        className='signInInput'
        value={loginCredentials.username}
        autoComplete="username"
      />
      <label htmlFor="e">
        Email
      </label>
      <input 
        type="email" 
        name="e"
        onChange={event => handleChange({email: event.target.value})} 
        className='signInInput'
        value={loginCredentials.email}
        autoComplete="email"
      />
      <label htmlFor="p">
        Password
      </label>
      <input 
        type="password" 
        name="p"
        onChange={event => handleChange({password: event.target.value})} 
        className='signInInput'
        value={loginCredentials.password}
        autoComplete="new-password"
      />
      <div className='btnContainer'>
        <button onClick={() => handleSignUp()} className='btn' disabled={disabled}>Sign Up</button>
      </div>
    </div>
  )
}