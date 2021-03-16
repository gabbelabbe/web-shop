import { useContext } from "react"
import { useHistory } from "react-router-dom"
import RoutingPath from "../../../routes/RoutingPath"
import { deleteUser } from "../../../shared/api/apiHandler"
import { CartContext } from "../../../shared/provider/CartProvider"
import { UserContext } from "../../../shared/provider/UserProvider"
import './DeleteAccountBtn.css'

export const DeleteAccountBtn = () => {
  const history = useHistory()
  const [authUser, setAuthUser] = useContext(UserContext)
  const [, setCart] = useContext(CartContext)

  const handleDeleteAccount = async () => {
    if (authUser) {
      const res = await deleteUser()
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
    <button onClick={() => handleDeleteAccount()} className='deleteAccountBtn'>
      Delete Account
    </button>
  )
}