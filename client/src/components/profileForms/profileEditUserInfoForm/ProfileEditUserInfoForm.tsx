import { useContext, useEffect, useState } from "react"
import { editUser } from "../../../shared/api/apiHandler"
import { UserContext } from "../../../shared/provider/UserProvider"
import './ProfileEditUserInfoForm.css'

export const ProfileEditUserInfoForm = () => {
  const [authUser, setAuthUser] = useContext(UserContext)
  const [userInfo, setUserInfo] = useState({...authUser})
  const [disabled, setDisabled] = useState(true)

  const handleChange = (newState: any) => {
    setUserInfo({...userInfo, ...newState})
  }

  const handleUpdateUserInfo = async () => {
    if (!disabled) {
      const response = await editUser(userInfo)
      if (response && response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        setAuthUser(response.data)
        setUserInfo({...response.data})
      }
    }
  }

  useEffect(() => {
    setDisabled(!(!!userInfo.username && !!userInfo.address && !!userInfo.email))
  }, [userInfo])

  return (
    <div className='editInfoForm'>
      <label htmlFor="un">
        Username
      </label>
      <input 
        type="text" 
        name="un"
        onChange={event => handleChange({username: event.target.value})} 
        className='editInfoInput'
        autoComplete="username"
        value={userInfo.username}
      />
      <label htmlFor="em">
        Email
      </label>
      <input 
        type="text" 
        name="em"
        onChange={event => handleChange({email: event.target.value})} 
        className='editInfoInput'
        autoComplete="email"
        value={userInfo.email}
      />
      <label htmlFor="ad">
        Address
      </label>
      <input 
        type="text" 
        name="ad"
        onChange={event => handleChange({address: event.target.value})} 
        className='editInfoInput'
        autoComplete="address"
        value={userInfo.address}
      />
      <div className='btnContainer'>
        <button onClick={handleUpdateUserInfo} className='btn' disabled={disabled}>Update Info</button>
      </div>
    </div>
  )
}