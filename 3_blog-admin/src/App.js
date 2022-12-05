import React from 'react'
import { useRoutes } from 'react-router-dom'

import router from './router'
import AppLayout from './components/AppLayout'

const App = () => {
  const element = useRoutes(router)

  return (
    <AppLayout>
      {element}
    </AppLayout>
  )
}

export default App