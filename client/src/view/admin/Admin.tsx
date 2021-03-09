import { useEffect, useState } from "react"
import { AdminChooseView } from "../../components/adminChooseView/AdminChooseView"
import { AdminProducts } from "../../components/adminProducts/AdminProducts"
import { getAllUsers } from "../../shared/api/apiHandler"
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import './Admin.css'
import { AdminUserList } from "../../components/adminUserList/AdminUserList"

export const Admin = () => {
  const [users, setUsers] = useState([])
  const [view, setView] = useState('products')

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
              view === 'users' ? <AdminUserList users={users} /> : null
            }

            {
              view === 'carts' ? <h1>Carts</h1> : null
            }
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}
