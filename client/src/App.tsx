import React from 'react'
import Routes from './routes/Routes'
import { UserProvider } from './shared/provider/UserProvider'
import { StarWarsProvider } from './shared/provider/StarWarsProvider'
import './shared/styles/style.css'

function App() {
  return (
    <StarWarsProvider>
      <UserProvider>
        <Routes />
      </UserProvider>
    </StarWarsProvider>
  )
}

export default App
