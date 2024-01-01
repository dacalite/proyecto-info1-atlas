'use client'

import Dashboard from '@/components/Dashboard'
import InfoBar from '@/components/InfoBar'
import UserAside from '@/components/UserAside'
import { ReloadContext } from '@/context/ReloadContext'
import { requestProjects } from '@/utils/requestProjects'
import { useContext, useEffect, useState } from 'react'
import { Toaster } from 'sonner'

function Home() {
  const [projectsData, setProjectsData] = useState([])
  const { needsReload } = useContext(ReloadContext)

  useEffect(() => {
    requestProjects().then((data) => setProjectsData(data))
  }, [needsReload])

  return (
    <div className="h-full w-full grid grid-cols-6 grid-rows-7 gap-4 bg-gray-100">
      <div className="row-span-7 border-r-2">
        <UserAside />
      </div>
      <div className="col-span-5 rounded-3xl">
        <InfoBar projectsData={projectsData} />
      </div>
      <div className="col-span-5 row-span-6 col-start-2 row-start-2 rounded-3xl">
        <Toaster />
        <Dashboard projectsData={projectsData} />
      </div>
    </div>
  )
}

export default Home
