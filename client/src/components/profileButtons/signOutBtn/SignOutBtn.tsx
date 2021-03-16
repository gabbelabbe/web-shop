import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import RoutingPath from '../../../routes/RoutingPath'
import { signOut } from '../../../shared/api/apiHandler'
import { CartContext } from '../../../shared/provider/CartProvider'
import { UserContext } from '../../../shared/provider/UserProvider'
import './SignOutBtn.css'

export const SignOutBtn = () => {
  const history = useHistory()
  const [authUser, setAuthUser] = useContext(UserContext)
  const [, setCart] = useContext(CartContext)

  const handleSignOut = async () => {
    if (authUser) {
      const res = await signOut()
      if (res && res.status === 200) {
        setAuthUser(undefined)
        setCart(undefined)
        localStorage.removeItem('user')
        localStorage.removeItem('cart')
        history.push(RoutingPath.homeView)
      }
    }
  }

  return (
    <button onClick={() => handleSignOut()} className='signOutBtn'>
      Sign Out
    </button>
  )
}