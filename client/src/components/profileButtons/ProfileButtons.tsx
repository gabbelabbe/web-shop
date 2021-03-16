import { DeleteAccountBtn } from "./deleteAccountBtn/DeleteAccountBtn"
import { SignOutBtn } from "./signOutBtn/SignOutBtn"
import './ProfileButtons.css'

export const ProfileButtons = () => {

  return (
    <div className='accountBtnsContainer'>
      <SignOutBtn />
      <DeleteAccountBtn />
    </div>
  )
}