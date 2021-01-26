import React from 'react'
import Routes from './routes/Routes'
import { UserProvider } from './shared/provider/UserProvider'
import './shared/styles/style.css'

function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  )
}

export default App
