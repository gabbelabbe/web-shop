import { ProfileButtons } from '../../components/profileButtons/ProfileButtons'
import { ProfileForms } from '../../components/profileForms/ProfileForms'
import './Profile.css'

export const Profile = () => {
  
  return (
    <div className='profileContainer'>
      <ProfileForms />
      <ProfileButtons />
    </div>
  )
}