import { useState } from "react"
import { AdminChooseView } from "../../components/adminChooseView/AdminChooseView"
import { AdminProducts } from "../../components/adminProducts/AdminProducts"
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import './Admin.css'
import { AdminUserList } from "../../components/adminUserList/AdminUserList"

export const Admin = () => {
  const [view, setView] = useState('products')

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
              view === 'users' ? <AdminUserList /> : null
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
