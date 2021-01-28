import useWindowSize from '../../hooks/useWindowResize'
import { DesktopHeader } from './desktopHeader/DesktopHeader'
import './Header.css'
import { MobileHeader } from './mobileHeader/MobileHeader';

export const Header = () => {
  const {width, height} = useWindowSize();

  return (
    <>
      {width > 700 ? <DesktopHeader /> : <MobileHeader />}
    </>
  )
}
