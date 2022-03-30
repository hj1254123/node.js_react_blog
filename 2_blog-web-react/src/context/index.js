import { SWRConfig } from 'swr'
import { IsShowProvider } from './IsShow-context'

export default function AppProviders({ children }) {
  return (
    <SWRConfig value={{
      onError: (error, key) => {
        console.log('swr全局错误处理', error, key)
      }
    }}>
      <IsShowProvider>{children}</IsShowProvider>
    </SWRConfig>
  )
}