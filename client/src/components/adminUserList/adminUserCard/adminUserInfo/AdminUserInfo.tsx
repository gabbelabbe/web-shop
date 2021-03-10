import { useContext } from 'react'
import { iloginCredentials } from "../../../../shared/interface/states"
import './AdminUserInfo.css'
import EditSVG from '../../../../shared/images/create-white-18dp.svg'
import { UserContext } from '../../../../shared/provider/UserProvider'

export const AdminUserInfo = ({ user, setEdit }: { user: iloginCredentials, setEdit: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [authUser] = useContext(UserContext)

  return (
    <>
      <p><strong>Username:</strong> {user.username}{authUser._id === user._id ? ' (you)' : ''}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>User type:</strong> {user.userType}</p>
      <div className='iconContainer'>
        <img src={EditSVG} alt='Edit' onClick={() => setEdit(true)} className='adminIcon edit' />
      </div>
    </>
  )
}