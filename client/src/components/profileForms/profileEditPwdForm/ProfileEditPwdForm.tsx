import { useContext, useEffect, useState } from "react"
import { editUser } from "../../../shared/api/apiHandler"
import Eye from '../../../shared/images/visibility-black-18dp.svg'
import EyeCrossed from '../../../shared/images/visibility_off-black-18dp.svg'
import { UserContext } from "../../../shared/provider/UserProvider"
import './ProfileEditPwdForm.css'

export const ProfileEditPwdForm = () => {
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
        setUserInfo({...response.data, oldPassword: '', newPassword: ''})
      }
    }
  }

  useEffect(() => {
    setDisabled(!(!!userInfo.oldPassword && !!userInfo.newPassword))
  }, [userInfo])

  useEffect(() => {
    setUserInfo({...authUser, oldPassword: userInfo.oldPassword, newPassword: userInfo.newPassword})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser])

  return (
    <div className='editPwdForm'>
      <label htmlFor="oldPw">
        Current Password
      </label>
      <div className='wrap-input100'>
        <input 
          type={showPwd ? 'text' : "password"}
          name="oldPw"
          onChange={event => handleChange({oldPassword: event.target.value})} 
          className={showPwd ? 'editPwdInput showPwd' : 'editPwdInput hidePwd'}
          autoComplete="password"
          value={userInfo.oldPassword}
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
          className={showPwd ? 'editPwdInput showPwd' : 'editPwdInput hidePwd'}
          autoComplete="password"
          value={userInfo.newPassword}
        />
        <img
          src={showPwd ? Eye : EyeCrossed } 
          alt="img"
          className="password-icon"
          onClick={() => setShowPwd(!showPwd)}
        />
      </div>
      <div className='btnContainer'>
        <button onClick={handleUpdateUserInfo} className='btn' disabled={disabled}>Update Password</button>
      </div>
    </div>
  )
}