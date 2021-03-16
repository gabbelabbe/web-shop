import { useEffect, useState } from "react"
import { AdminChooseView } from "../../components/adminChooseView/AdminChooseView"
import { AdminProducts } from "../../components/adminProducts/AdminProducts"
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import './Admin.css'
import { AdminUserList } from "../../components/adminUserList/AdminUserList"
import { iloginCredentials } from "../../shared/interface/states"
import { getAllUsers } from "../../shared/api/apiHandler"

export const Admin = () => {
  const [view, setView] = useState('products')
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
    <div className='adminContainer'>
      <AdminChooseView view={view} setView={setView} />
      <SwitchTransition>
        <CSSTransition key={view} timeout={500} classNames={'fade'}>
          <div className='adminContentContainer'>
            {
              view === 'products' ? <AdminProducts /> : null
            }

            {
              view === 'users' ? <AdminUserList users={users} setUsers={setUsers} /> : null
            }
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}
