import { ProfileContent } from './profileContent/ProfileContent'
import { ProfileImg } from './profileImg/ProfileImg'
import './ProfileInfo.css'

export const ProfileInfo = () => {

  return (
    <div className='profileInfoContainer'>
      <ProfileImg />
      <ProfileContent />
    </div>
  )
}