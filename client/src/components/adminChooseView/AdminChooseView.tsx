import './AdminChooseView.css'

export const AdminChooseView = ({ view, setView }: { view: string, setView: React.Dispatch<React.SetStateAction<string>> }) => {

  return (
    <div className='adminButtonContainer' >
      <button className={'adminViewButton' + (view === 'products' ? ' selected' : '')} onClick={() => setView('products')} >Products</button>
      <button className={'adminViewButton' + (view === 'users' ? ' selected' : '')} onClick={() => setView('users')} >Users</button>
    </div>
  )
}