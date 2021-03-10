import { useState } from "react"
import { iloginCredentials } from "../../../shared/interface/states"
import { AdminEditUser } from "./adminEditUser/AdminEditUser"
import './AdminUserCard.css'
import { AdminUserInfo } from "./adminUserInfo/AdminUserInfo"

export const AdminUserCard = (
  { user, setUsers, users }: 
  { user: iloginCredentials, setUsers: React.Dispatch<React.SetStateAction<iloginCredentials[]>>, users: iloginCredentials[] }
) => {
  const [edit, setEdit] = useState(false)

  return (
    <div className='adminUserCard'>
      {
        edit ? <AdminEditUser user={user} setEdit={setEdit} setUsers={setUsers} users={users} /> : <AdminUserInfo user={user} setEdit={setEdit} />
      }
    </div>
  )
}