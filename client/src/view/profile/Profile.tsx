import { ProfileButtons } from '../../components/profileButtons/ProfileButtons'
import { ProfileEditUserInfoForm } from '../../components/profileEditUserInfoForm/ProfileEditUserInfoForm'
import './Profile.css'

export const Profile = () => {
  
  return (
    <div className='profileContainer'>
      <div className='infoAndFormContainer'>
        <ProfileEditUserInfoForm />
      </div>
      <ProfileButtons />
    </div>
  )
}