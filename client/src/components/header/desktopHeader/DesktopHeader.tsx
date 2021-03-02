import { useContext } from 'react'
import { Link, useHistory } from "react-router-dom"
import RoutingPath from "../../../routes/RoutingPath"
import HomeSVG from '../../../shared/images/home-white-18dp.svg'
import CartSVG from '../../../shared/images/shopping_cart-white-18dp.svg'
import './DesktopHeader.css'
import { UserContext } from '../../../shared/provider/UserProvider'

export const DesktopHeader = () => {
  const history = useHistory()
  const [authUser] = useContext(UserContext)

  return (
    <header className='header'>
      <img src={HomeSVG} alt="Home Button" onClick={() => history.push(RoutingPath.homeView)} className='svgs'></img>
      <Link to={RoutingPath.productView} style={{marginLeft: 'auto'}}>Products</Link>
      <Link to={RoutingPath.newsView}>News</Link>
      <Link to={RoutingPath.aboutView}>About</Link>
      <Link to={RoutingPath.guidelinesView}>Guidelines</Link>
      {authUser && authUser.userType === 'admin' ? <Link to={RoutingPath.adminView}>Admin</Link> : null}
      {authUser ? <Link to={RoutingPath.profileView}>{authUser.username}</Link> : <Link to={RoutingPath.signInView}>Sign In</Link>}
      <img src={CartSVG} alt='Cart Button' onClick={() => history.push(RoutingPath.cartView)} className='svgs' />
    </header>
  )
}
