import { useState, useContext, useEffect } from 'react'
import { iloginCredentials } from '../../shared/interface/states'
import { useHistory } from 'react-router-dom'
import RoutingPath from '../../routes/RoutingPath'
import { UserContext } from '../../shared/provider/UserProvider'
import Eye from '../../shared/images/visibility-black-18dp.svg'
import EyeCrossed from '../../shared/images/visibility_off-black-18dp.svg'
import './SignIn.css'
import { signIn } from '../../shared/api/apiHandler'
import { CartContext } from '../../shared/provider/CartProvider'

export const SignIn = () => {
  const history = useHistory()
  const [loginCredentials, setLoginCredentials] = useState<iloginCredentials>({username: '', password: ''})
  const [, setAuthUser] = useContext(UserContext)
  const [, setCart] = useContext(CartContext)
  const [disabled, setDisabled] = useState(true)
  const [showPwd, setShowPwd] = useState(false)

  const handleSignIn = async () => {
    if (loginCredentials.username  && loginCredentials.password) {
      const response = await signIn(loginCredentials.username, loginCredentials.password)
      if (response && response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        localStorage.setItem('cart', JSON.stringify(response.data.cart))
        setAuthUser(response.data)
        setCart(response.data.cart)
        history.push(RoutingPath.homeView)
      }
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
      <div className='wrap-input100'>
        <input 
          type={showPwd ? 'text' : "password"}
          name="pw"
          onChange={event => handleChange({password: event.target.value})} 
          className={showPwd ? 'signInInput showPwd' : 'signInInput hidePwd'}
          autoComplete="password"
        />
        <img
          src={showPwd ? Eye : EyeCrossed }
          alt="img"
          className="password-icon"
          onClick={() => setShowPwd(!showPwd)}
        />
      </div>
      <div className='btnContainer'>
        <button onClick={handleSignIn} className='btn' disabled={disabled}>Sign In</button>
        <p>Don't have an account? Sign up now!</p>
        <button onClick={() => history.push(RoutingPath.signUpView)} className='btn'>Sign Up</button>
      </div>
    </div>
  )
}