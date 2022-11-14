import { SWRConfig } from 'swr'
import { message } from 'antd';

import { AuthProvider } from './auth-context';

export default function AppProviders({ children }) {

  return (
    <SWRConfig value={{
      onError: (error, key) => {
        message.error(error.statusText)
        // TODO:上报错误
      }
    }}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SWRConfig>
  )
}