import { useContext } from 'react'
import { iloginCredentials } from "../../../../shared/interface/states"
import './AdminUserInfo.css'
import EditSVG from '../../../../shared/images/create-white-18dp.svg'
import { UserContext } from '../../../../shared/provider/UserProvider'

export const AdminUserInfo = ({ user, setEdit }: { user: iloginCredentials, setEdit: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [authUser] = useContext(UserContext)

  return (
    <>
      <h3>Username: {user.username}{authUser._id === user._id ? ' (you)' : ''}</h3>
      <h3>Email: {user.email}</h3>
      <h3>Address: {user.address}</h3>
      <h3>User type: {user.userType}</h3>
      <div className='iconContainer'>
        <img src={EditSVG} alt='Edit' onClick={() => setEdit(true)} className='adminIcon edit' />
      </div>
    </>
  )
}