import { useContext, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import RoutingPath from "../../../routes/RoutingPath"
import { UserContext } from "../../../shared/provider/UserProvider"
import HomeSVG from '../../../shared/images/home-white-18dp.svg'
import CartSVG from '../../../shared/images/shopping_cart-white-18dp.svg'
import HamSVG from '../../../shared/images/menu-white-18dp.svg'
import './MobileHeader.css'

export const MobileHeader = () => {
  const history = useHistory()
  const [authUser, setAuthUser] = useContext(UserContext)
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className='header'>
      <img src={HomeSVG} alt="Home Button" onClick={() => history.push(RoutingPath.homeView)} className='svgs' />
      <img src={HamSVG} alt="Menu button" className='svgs' style={{marginLeft: 'auto'}} onClick={() => setShowMenu(!showMenu)} />
      <div className='contentContainer' style={{display: showMenu ? 'flex' : ''}}>
        <Link to='/products'>Products</Link>
        <Link to='/news'>News</Link>
        <Link to={RoutingPath.aboutView}>About</Link>
        <Link to='/guidelines'>Guidelines</Link>
        {authUser ? <Link to={RoutingPath.profileView}>{authUser.username}</Link> : <Link to={RoutingPath.signInView}>Sign In</Link>}
        <img src={CartSVG} alt='Cart Button' onClick={() => history.push('/cart')} className='svgs' />
      </div>
    </header>
  )
}