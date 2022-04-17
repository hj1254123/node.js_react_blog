import { SWRConfig } from 'swr'
import { IsShowProvider } from './IsShow-context'
import { TitleProvider } from './Title-context'

export default function AppProviders({ children }) {
  return (
    <SWRConfig value={{
      onError: (error, key) => {
        console.log('swr全局错误处理', error, key)
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