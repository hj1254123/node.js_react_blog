import { useNavigate } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { IsShowProvider } from './IsShow-context'
import { TitleProvider } from './Title-context'

export default function AppProviders({ children }) {
  const navigate = useNavigate()
  return (
    <SWRConfig value={{
      onError: (error, key) => {
        console.log('swr全局错误处理', error, key)
        if(error.status === 404) {
          navigate('/404')
        }
      }
    }}>
      <IsShowProvider>
        <TitleProvider>
          {children}
        </TitleProvider>
      </IsShowProvider>
    </SWRConfig>
  )
}