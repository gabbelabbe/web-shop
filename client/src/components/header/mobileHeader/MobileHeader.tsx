import { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import RoutingPath from "../../../routes/RoutingPath"
import { UserContext } from "../../../shared/provider/UserProvider"
import HomeSVG from '../../../shared/images/home-white-18dp.svg'
import CartSVG from '../../../shared/images/shopping_cart-white-18dp.svg'
import HamSVG from '../../../shared/images/menu-white-18dp.svg'
import './MobileHeader.css'

export const MobileHeader = () => {
  const history = useHistory()
  const [authUser] = useContext(UserContext)
  const [showMenu, setShowMenu] = useState(false)
  
  const closeMenuOnNewUrl = (url: string) => {
    history.push(url)
    setShowMenu(false)
  }

  return (
    <header className='header'>
      <img src={HomeSVG} alt="Home Button" onClick={() => history.push(RoutingPath.homeView)} className='svgs' />
      <img src={HamSVG} alt="Menu button" className='svgs' style={{marginLeft: 'auto'}} onClick={() => setShowMenu(!showMenu)} />
      <div className={showMenu ? 'contentContainer open' : 'contentContainer'}>
        <span className='link' onClick={() => closeMenuOnNewUrl(RoutingPath.productView)}>Products</span>
        <span className='link' onClick={() => closeMenuOnNewUrl(RoutingPath.newsView)}>News</span>
        <span className='link' onClick={() => closeMenuOnNewUrl(RoutingPath.aboutView)}>About</span>
        <span className='link' onClick={() => closeMenuOnNewUrl(RoutingPath.guidelinesView)}>Guidelines</span>
        {authUser ? <span className='link' onClick={() => closeMenuOnNewUrl(RoutingPath.profileView)}>{authUser.username}</span> : <span className='link' onClick={() => closeMenuOnNewUrl(RoutingPath.signInView)}>Sign In</span>}
        <img src={CartSVG} alt='Cart Button' onClick={() => closeMenuOnNewUrl(RoutingPath.cartView)} className='svgs' />
      </div>
    </header>
  )
}