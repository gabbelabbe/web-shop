import { useState } from "react"
import { iloginCredentials } from "../../../../shared/interface/states"
import DoneSVG from '../../../../shared/images/done-white-18dp.svg'
import CancelSVG from '../../../../shared/images/clear-white-18dp.svg'
import { updateUser } from "../../../../shared/api/apiHandler"
import './AdminEditUser.css'

export const AdminEditUser = (
  { user, setEdit, setUsers, users }: 
  { user: iloginCredentials, setEdit: React.Dispatch<React.SetStateAction<boolean>>, setUsers: React.Dispatch<React.SetStateAction<iloginCredentials[]>>, users: iloginCredentials[] }
) => {
  const [userInfo, setUserInfo] = useState({...user})

  const handleChange = (newState: iloginCredentials) => {
    setUserInfo({...userInfo, ...newState})
  }

  const handleEdit = async () => {
    const res = await updateUser(userInfo)
    if (res && res.status === 200) {
      setUsers([...users.filter((u) => userInfo._id !== u._id), userInfo])
      setEdit(false)
    }
  }

  return (
    <>
      <input type="text" id='username' value={userInfo.username} onChange={(e) => handleChange({ username: e.target.value })} />
      <input type="text" id='email' value={userInfo.email} onChange={(e) => handleChange({ email: e.target.value })} />
      <input type="text" id='address' value={userInfo.address} onChange={(e) => handleChange({ address: e.target.value })} />
      <input type="text" id='userType' value={userInfo.userType} onChange={(e) => handleChange({ userType: e.target.value })} />
      <div className='iconContainer'>
        <img src={DoneSVG} alt='Done' onClick={() => handleEdit()} className='adminIcon done' />
        <img src={CancelSVG} alt='Cancel' onClick={() => setEdit(false)} className='adminIcon cancel' />
      </div>
    </>
  )
}