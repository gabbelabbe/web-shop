import { Link, useHistory } from "react-router-dom"
import RoutingPath from "../../../routes/RoutingPath"
import HomeSVG from '../../../shared/images/home-white-18dp.svg'
import './DesktopHeader.css'

export const DesktopHeader = () => {
  const history = useHistory()

  return (
    <header className='header'>
      <img src={HomeSVG} alt="Home Button" onClick={() => history.push(RoutingPath.homeView)} className='homeBtn'></img>
      <Link to='/prodducts' style={{marginLeft: 'auto'}}>Products</Link>
      <Link to={RoutingPath.signInView}>Sign In</Link>
      <Link to='/news'>News</Link>
      <Link to='/cart'>Cart</Link>
      <Link to={RoutingPath.aboutView}>About</Link>
      <Link to='/guidelines'>Guidelines</Link>
    </header>
  )
}
