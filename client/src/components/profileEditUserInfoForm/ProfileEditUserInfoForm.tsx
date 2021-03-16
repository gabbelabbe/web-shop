import { useContext, useEffect, useState } from "react"
import { editUser } from "../../shared/api/apiHandler"
import Eye from '../../shared/images/visibility-black-18dp.svg'
import EyeCrossed from '../../shared/images/visibility_off-black-18dp.svg'
import { UserContext } from "../../shared/provider/UserProvider"

import './ProfileEditUserInfoForm.css'

export const ProfileEditUserInfoForm = () => {
  const [authUser, setAuthUser] = useContext(UserContext)
  const [userInfo, setUserInfo] = useState({...authUser, oldPassword: '', newPassword: ''})
  const [showPwd, setShowPwd] = useState(false)
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
      }
    }
  }

  useEffect(() => {
    setDisabled(!(!!userInfo.username && !!userInfo.oldPassword && !!userInfo.newPassword && !!userInfo.address && !!userInfo.email))
  }, [userInfo])

  return (
    <div className='signInForm'>
      <label htmlFor="un">
        Username
      </label>
      <input 
        type="text" 
        name="un"
        onChange={event => handleChange({username: event.target.value})} 
        className='signInInput'
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
        className='signInInput'
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
        className='signInInput'
        autoComplete="address"
        value={userInfo.address}
      />
      <label htmlFor="oldPw">
        Current Password
      </label>
      <div className='wrap-input100'>
        <input 
          type={showPwd ? 'text' : "password"}
          name="oldPw"
          onChange={event => handleChange({oldPassword: event.target.value})} 
          className={showPwd ? 'signInInput showPwd' : 'signInInput hidePwd'}
          autoComplete="password"
        />
        <img
          src={showPwd ? Eye : EyeCrossed } 
          alt="img"
          className="password-icon"
          onClick={() => setShowPwd(!showPwd)}
        />
      </div>
      <label htmlFor="newPw">
        New Password
      </label>
      <div className='wrap-input100'>
        <input 
          type={showPwd ? 'text' : "password"}
          name="newPw"
          onChange={event => handleChange({newPassword: event.target.value})} 
          className={showPwd ? 'signInInput showPwd' : 'signInInput hidePwd'}
          autoComplete="password"
        />
        <img
          src={showPwd ? Eye : EyeCrossed } 
          alt="img"
          className="password-icon"
          onClick={() => setShowPwd(!showPwd)}
        />
      </div>
      <div className='btnContainer'>
        <button onClick={handleUpdateUserInfo} className='btn' disabled={disabled}>Update Info</button>
      </div>
    </div>
  )
}