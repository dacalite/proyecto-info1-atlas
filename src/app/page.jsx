'use client'

import Dashboard from '@/components/Dashboard'
import { ReloadContextProvider } from '@/context/reloadContext'

function Home() {
  return (
    <div className="h-full w-full grid grid-cols-6 grid-rows-7 gap-4">
      <div className="row-span-7 bg-gray-100">1</div>
      <div className="col-span-5 bg-gray-100 rounded-3xl">3</div>
      <div className="col-span-5 row-span-6 col-start-2 row-start-2 bg-gray-100 rounded-3xl">
        <ReloadContextProvider>
          <Dashboard />
        </ReloadContextProvider>
      </div>
    </div>
  )
}

export default Home
