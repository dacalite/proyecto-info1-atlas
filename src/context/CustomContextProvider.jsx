'use client'

import { ReloadContextProvider } from './ReloadContext'

function CustomContextProvider({ children }) {
  return <ReloadContextProvider>{children}</ReloadContextProvider>
}

export default CustomContextProvider
