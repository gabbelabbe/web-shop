import { Link, useHistory } from "react-router-dom"
import HomeSVG from '../../shared/images/home-white-18dp.svg'

export const Header = () => {
  const history = useHistory()

  return (
    <header className='header'>
      <img src={HomeSVG} alt="Home Button" onClick={() => history.push('/')} className='homeBtn'></img>
      <Link to='/about' style={{marginLeft: 'auto'}}>About</Link>
    </header>
  )
}
