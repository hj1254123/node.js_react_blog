import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import router from './router'

import LoadingLazy from './components/LoadingLazy'
import AppLayout from './components/AppLayout'

export default function App() {
  const element = useRoutes(router)

  return (
    <AppLayout>
      <Suspense fallback={<LoadingLazy />}>
        {element}
      </Suspense>
    </AppLayout>

  )
}
