import { useState, useContext, useEffect } from 'react'
import { iloginCredentials } from '../../shared/interface/states'
import { useHistory } from 'react-router-dom'
import RoutingPath from '../../routes/RoutingPath'
import { UserContext } from '../../shared/provider/UserProvider'
import Eye from '../../shared/images/visibility-black-18dp.svg'
import EyeCrossed from '../../shared/images/visibility_off-black-18dp.svg'
import './SignUp.css'
import { signUp } from '../../shared/api/apiHandler'
import { CartContext } from '../../shared/provider/CartProvider'

export const SignUp = () => {
  const history = useHistory()
  const [loginCredentials, setLoginCredentials] = useState<iloginCredentials>({username: '', email: '', password: ''})
  const [, setAuthUser] = useContext(UserContext)
  const [, setCart] = useContext(CartContext)
  const [disabled, setDisabled] = useState(true)
  const [showPwd, setShowPwd] = useState(false)

  const handleSignUp = async () => {
    if (loginCredentials.username && loginCredentials.email && loginCredentials.password) {
      const response = await signUp(loginCredentials.email, loginCredentials.username, loginCredentials.password)
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
    setDisabled(!(!!loginCredentials.username && !!loginCredentials.password && !!loginCredentials.email))
  }, [loginCredentials])

  return (
    <div className='signUpForm'>
      <label htmlFor="u">
        Username
      </label>
      <input 
        type="text" 
        name="u"
        onChange={event => handleChange({username: event.target.value})} 
        className='signUpInput'
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
        className='signUpInput'
        value={loginCredentials.email}
        autoComplete="email"
      />
      <label htmlFor="p">
        Password
      </label>
      <div className='wrap-input100'>
        <input 
          type={showPwd ? 'text' : "password"}
          name="pw"
          onChange={event => handleChange({password: event.target.value})} 
          className={showPwd ? 'signUpInput showPwd' : 'signUpInput hidePwd'}
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
        <button onClick={() => handleSignUp()} className='btn' disabled={disabled}>Sign Up</button>
      </div>
    </div>
  )
}