import { useLocation } from 'react-router-dom'
import { SignIn } from '../components/signIn/SignIn'
import { SignUp } from '../components/signUp/SignUp'
import RoutingPath from '../routes/RoutingPath'

export const SignInView = () => {
  const location = useLocation()

  return (
    <>
      {
        location.pathname === RoutingPath.signInView ? <SignIn /> : <SignUp />
      }
    </>
  )
}