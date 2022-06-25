import { SWRConfig } from 'swr'
import toast from 'react-hot-toast';

import { IsShowProvider } from './IsShow-context'
import { TitleProvider } from './Title-context'

export default function AppProviders({ children }) {
  return (
    <SWRConfig value={{
      onError: (error, key) => {
        toast(error.statusText)
        // TODO:上报错误
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