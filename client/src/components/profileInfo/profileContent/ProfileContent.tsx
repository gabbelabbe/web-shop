import { useContext } from "react"
import { UserContext } from "../../../shared/provider/UserProvider"
import './ProfileContent.css'

export const ProfileContent = () => {
  const [authUser] = useContext(UserContext)

  return (
    <div className='profileContentContainer'>
      <h2>{authUser? authUser.username : 'Ditt Namn'}</h2>
      <h2>{authUser? authUser.email : 'Din Mail'}</h2>
    </div>
  )
}