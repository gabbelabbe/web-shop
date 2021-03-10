import { iloginCredentials } from "../../shared/interface/states"
import { AdminUserCard } from "./adminUserCard/AdminUserCard"
import './AdminUserList.css'

export const AdminUserList = ({ users, setUsers }: { setUsers: React.Dispatch<React.SetStateAction<iloginCredentials[]>>, users: iloginCredentials[] }) => {
  
  return (
    <div className='adminUserList'>
      {
        users.map((user) => {
          return (
            <AdminUserCard user={user} setUsers={setUsers} users={users} />
          )
        })
      }
    </div>
  )
}