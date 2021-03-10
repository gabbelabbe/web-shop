import { useEffect, useState } from "react"
import { getAllUsers } from "../../shared/api/apiHandler"
import { iloginCredentials } from "../../shared/interface/states"
import { AdminUserCard } from "./adminUserCard/AdminUserCard"
import './AdminUserList.css'

export const AdminUserList = () => {
  const [users, setUsers] = useState<iloginCredentials[]>([])

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await getAllUsers()

      if (response && response.data) {
        setUsers(response.data)
      }
    }

    fetchAllUsers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
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