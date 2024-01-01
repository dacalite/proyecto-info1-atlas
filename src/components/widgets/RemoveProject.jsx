'use client'

import { BadgeCheckIcon } from '@heroicons/react/solid'

import { SearchSelect } from '@tremor/react'
import { SearchSelectItem } from '@tremor/react'
import { Button } from '@tremor/react'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import {
  ERROR_TOAST_STYLE,
  LOADING_TOAST_STYLE,
  SUCCESS_TOAST_STYLE,
  TOAST_DURATION,
  TOAST_POSITION,
} from '@/utils/toastPreferences'
import { ReloadContext } from '@/context/ReloadContext'

function RemoveProject({ projectIds, closeWidget }) {
  const [deletingProject, setDeletingProject] = useState(false)
  const [projectId, setProjectId] = useState('')
  const { refreshData } = useContext(ReloadContext)

  const deleteProject = async () => {
    let loadingToast = null
    try {
      loadingToast = toast.loading('Eliminando proyecto...', {
        style: LOADING_TOAST_STYLE,
        duration: null,
        position: TOAST_POSITION,
      })

      setDeletingProject(true)
      await axios.delete(`http://localhost:3000/api/projects?id=${projectId}`)
      setDeletingProject(false)

      toast.dismiss(loadingToast)

      closeWidget()
      refreshData()

      toast.success('Proyecto eliminado correctamente', {
        style: SUCCESS_TOAST_STYLE,
        duration: TOAST_DURATION,
        position: TOAST_POSITION,
      })
    } catch (e) {
      setDeletingProject(false)
      console.log(e)
      toast.dismiss(loadingToast)
      toast.error('Error al eliminar el proyecto', {
        style: ERROR_TOAST_STYLE,
        duration: TOAST_DURATION,
        position: TOAST_POSITION,
      })
    }
  }

  return (
    <div className="w-full h-full bg-red-100 rounded-3xl flex flex-col justify-start items-center p-10">
      <p className="text-4xl font-semibold text-gray-800 mb-10">
        Eliminar proyecto
      </p>
      <SearchSelect
        icon={BadgeCheckIcon}
        placeholder="Id del proyecto"
        className="mb-4"
        value={projectId}
        onValueChange={setProjectId}
        autoComplete="off"
      >
        {projectIds
          ? projectIds.map((currentId) => (
              <SearchSelectItem key={currentId} value={currentId}>
                {currentId}
              </SearchSelectItem>
            ))
          : []}
      </SearchSelect>
      <Button
        className="w-1/3 mt-6"
        color="rose"
        disabled={projectId === ''}
        loading={deletingProject}
        loadingText="ELIMINANDO..."
        onClick={deleteProject}
      >
        ELIMINAR
      </Button>
    </div>
  )
}

export default RemoveProject