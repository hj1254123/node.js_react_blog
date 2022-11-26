import { useRoutes, Navigate } from 'react-router-dom'
import { useAuthContext } from './context/auth-context'
import router from './router'

function App() {
  const { user } = useAuthContext()
  const element = useRoutes(router)
  return (
    <div className="App">
      {element}
    </div>
  )
}

export default App
