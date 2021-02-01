import { useState, useContext, useEffect } from 'react'
import { iloginCredentials } from '../../shared/interface/states'
import { useHistory } from 'react-router-dom'
import RoutingPath from '../../routes/RoutingPath'
import { UserContext } from '../../shared/provider/UserProvider'
import './SignIn.css'

export const SignIn = () => {
  const history = useHistory()
  const [loginCredentials, setLoginCredentials] = useState<iloginCredentials>({username: '', password: ''})
  const [authUser, setAuthUser] = useContext(UserContext)
  const [disabled, setDisabled] = useState(true)
  const [showPwd, setShowPwd] = useState(false)

  const handleSignIn = () => {
    if (loginCredentials.username  && loginCredentials.password) {
      localStorage.setItem('user', JSON.stringify({username: loginCredentials.username}))
      setAuthUser(loginCredentials)
      history.push(RoutingPath.homeView)
    }
  }

  const handleChange = (newState: iloginCredentials) => {
    setLoginCredentials({...loginCredentials, ...newState})
  }

  useEffect(() => {
    setDisabled(!(!!loginCredentials.username && !!loginCredentials.password))
  }, [loginCredentials])

  return (
    <div className='signInForm'>
      <label htmlFor="un">
        Username
      </label>
      <input 
        type="text" 
        name="un"
        onChange={event => handleChange({username: event.target.value})} 
        className='signInInput'
        autoComplete="username"
      />
      <label htmlFor="pw">
        Password
      </label>
      <input 
        type={showPwd ? 'text' : "password"}
        name="pw"
        onChange={event => handleChange({password: event.target.value})} 
        className={showPwd ? 'signInInput showPwd' : 'signInInput hidePwd'}
        autoComplete="password"
      />
      <div className='btnContainer'>
        <button onClick={handleSignIn} className='btn' disabled={disabled}>Sign In</button>
        <p>Don't have an account? Sign up now!</p>
        <button onClick={() => history.push(RoutingPath.signUpView)} className='btn'>Sign Up</button>
      </div>
    </div>
  )
}