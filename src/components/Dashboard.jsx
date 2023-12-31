'use client'

import { PencilIcon, PlusIcon, XIcon } from '@heroicons/react/solid'
import MultipleSelectList from './MultipleSelectList'
import ProjectsList from './ProjectsList'
import { useContext, useEffect, useState } from 'react'
import { requestProjects } from '@/utils/requestProjects'
import { ReloadContext } from '@/context/reloadContext'

export default function Dashboard() {
  const [projectsData, setProjectsData] = useState([])
  const { needsReload, refreshData } = useContext(ReloadContext)
  const [deployedWidget, setDeployedWidget] = useState(null)

  const deployWidget = (action) => {
    setDeployedWidget(action)
  }

  const closeWidget = () => {
    setDeployedWidget(null)
  }

  useEffect(() => {
    requestProjects().then((data) => setProjectsData(data))
  }, [needsReload])
  return (
    <>
      <div className="h-full w-full p-10 flex-column justify-center items-center">
        <div className="rounded-2xl w-full h-1/4 flex justify-between items-center gap-14">
          <div
            onClick={() => deployWidget('add')}
            className="bg-emerald-200 h-full w-full rounded-2xl flex flex-col justify-center items-center gap-4 hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] transition-shadow duration-400 cursor-pointer"
          >
            <div className="h-1/2 aspect-square bg-emerald-300 flex justify-center items-center rounded-full shadow-[inset_-8.0px_-8.0px_8.0px_rgba(0,0,0,0.1)]">
              <PlusIcon className="text-emerald-700 w-1/2 h-1/2" />
            </div>
            <h2 className="text-emerald-700 text-2xl font-bold">Añadir</h2>
          </div>
          <div
            onClick={() => deployWidget('add')}
            className="bg-blue-200 h-full w-full rounded-2xl flex flex-col justify-center items-center gap-4 hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] transition-shadow duration-400 cursor-pointer"
          >
            <div className="h-1/2 aspect-square bg-blue-300 flex justify-center items-center rounded-full shadow-[inset_-8.0px_-8.0px_8.0px_rgba(0,0,0,0.1)]">
              <PencilIcon className="text-blue-700 w-1/2 h-1/2" />
            </div>
            <h2 className="text-blue-700 text-2xl font-bold">Modificar</h2>
          </div>
          <div
            onClick={() => deployWidget('add')}
            className="bg-red-200 h-full w-full rounded-2xl flex flex-col justify-center items-center gap-4 hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] transition-shadow duration-400 cursor-pointer"
          >
            <div className="h-1/2 aspect-square bg-red-300 flex justify-center items-center rounded-full shadow-[inset_-8.0px_-8.0px_8.0px_rgba(0,0,0,0.1)]">
              <XIcon className="text-red-700 w-1/2 h-1/2" />
            </div>
            <h2 className="text-red-700 text-2xl font-bold">Eliminar</h2>
          </div>
        </div>
        <div className="w-full h-3/4 pt-8 gap-8 flex">
          <div className="w-2/3 h-full rounded-2xl bg-white">
            <ProjectsList projectsData={projectsData} />
          </div>
          <div className="w-1/3 h-full rounded-2xl bg-white">
            <MultipleSelectList projectsData={projectsData} />
          </div>
        </div>
      </div>
      {deployedWidget && (
        <div
          className={`z-10 fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm ${
            deployedWidget ? 'block' : 'hidden'
          }`}
          onClick={closeWidget}
        >
          <div
            className="w-1/3 h-1/3 bg-white rounded-2xl absolute inset-1/3 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <h1>hola</h1>
          </div>
        </div>
      )}
    </>
  )
}
