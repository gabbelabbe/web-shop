import { useContext } from "react"
import { UserContext } from "../../shared/provider/UserProvider"
import './Profile.css'

export const Profile = () => {
  const [authUser, setAuthUser] = useContext(UserContext)

  return (
    <div className='profileDiv'>
      <img className='profileImg' src='https://thispersondoesnotexist.com/image' alt='profile img' />
      <p>{authUser.username}</p>
    </div>
  )
}