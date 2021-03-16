import { ProfileEditPwdForm } from './profileEditPwdForm/ProfileEditPwdForm'
import { ProfileEditUserInfoForm } from './profileEditUserInfoForm/ProfileEditUserInfoForm'
import './ProfileForms.css'

export const ProfileForms = () => {
  return (
    <div className='profileFormsContainer'>
      <ProfileEditUserInfoForm />
      <ProfileEditPwdForm />
    </div>
  )
}