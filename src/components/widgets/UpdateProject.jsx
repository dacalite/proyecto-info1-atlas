'use client'

import {
  BadgeCheckIcon,
  CodeIcon,
  DesktopComputerIcon,
  InformationCircleIcon,
  PuzzleIcon,
} from '@heroicons/react/solid'
import { SearchSelect } from '@tremor/react'
import { SearchSelectItem } from '@tremor/react'
import { Button } from '@tremor/react'
import { TextInput } from '@tremor/react'
import React, { useContext, useEffect, useState } from 'react'
import {
  allowedFrameworks,
  allowedLanguages,
  allowedTypes,
} from '@/utils/allowedTypes'
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

function UpdateProject({ projectIds, appIds, projectsData, closeWidget }) {
  const [appError, setAppError] = useState(false)
  const [updatingProject, setUpdatingProject] = useState(false)
  const { refreshData } = useContext(ReloadContext)
  const [appId, setAppId] = useState('')

  const [formData, setFormData] = useState({
    IdProyecto: '',
    IdAplicacion: '',
    TipoAplicacion: '',
    Framework: '',
    NombreArchivo: '',
    Lenguaje: '',
  })

  const updateProject = async () => {
    let loadingToast = null
    try {
      loadingToast = toast.loading('Actualizando proyecto...', {
        style: LOADING_TOAST_STYLE,
        duration: null,
        position: TOAST_POSITION,
      })

      setUpdatingProject(true)
      await axios.put('http://localhost:3000/api/projects', formData)
      setUpdatingProject(false)

      toast.dismiss(loadingToast)

      closeWidget()
      refreshData()

      toast.success('Proyecto actualizado correctamente', {
        style: SUCCESS_TOAST_STYLE,
        duration: TOAST_DURATION,
        position: TOAST_POSITION,
      })
    } catch (e) {
      setUpdatingProject(false)
      console.log(e)
      toast.dismiss(loadingToast)
      toast.error('Error al actualizar el proyecto', {
        style: ERROR_TOAST_STYLE,
        duration: TOAST_DURATION,
        position: TOAST_POSITION,
      })
    }
  }

  const uploadProjectData = (id) => {
    const projectData = projectsData.find(
      (project) => project.IdProyecto === id
    )

    setAppId(projectData ? projectData.IdAplicacion : '')

    projectData ?
    setFormData({
      IdProyecto: projectData.IdProyecto,
      IdAplicacion: projectData.IdAplicacion,
      TipoAplicacion: projectData.TipoAplicacion,
      Framework: projectData.Framework,
      NombreArchivo: projectData.NombreArchivo,
      Lenguaje: projectData.Lenguaje,
    }) :
    setFormData({
      IdProyecto: '',
      IdAplicacion: '',
      TipoAplicacion: '',
      Framework: '',
      NombreArchivo: '',
      Lenguaje: '',
    })
  }

  useEffect(() => {
    if (
      formData.IdAplicacion !== '' && formData.IdAplicacion !== appId &&
      appIds.includes(formData.IdAplicacion)
    ) {
      setAppError(true)
    } else {
      setAppError(false)
    }
  }, [appIds, formData.IdAplicacion, appId])

  return (
    <div className="w-full h-full bg-blue-100 rounded-3xl flex flex-col justify-start items-center p-10">
      <p className="text-4xl font-semibold text-gray-800 mb-10">
        Actualizar proyecto
      </p>
      <SearchSelect
        icon={BadgeCheckIcon}
        placeholder="Id del proyecto"
        className="mb-4"
        value={formData.IdProyecto}
        onValueChange={(value) => {
          uploadProjectData(value)
        }}
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
      <TextInput
        value={formData.IdAplicacion}
        onValueChange={(value) =>
          setFormData({ ...formData, IdAplicacion: value })
        }
        placeholder="Id de la aplicación"
        error={appError}
        errorMessage="El Id introducido ya pertenece a una aplicación"
        className="mb-4"
        icon={BadgeCheckIcon}
        autoComplete="off"
        disabled={formData.IdProyecto === ''}
      />
      <SearchSelect
        icon={DesktopComputerIcon}
        placeholder="Tipo de aplicación"
        className="mb-4"
        value={formData.TipoAplicacion}
        onValueChange={(value) =>
          setFormData({ ...formData, TipoAplicacion: value })
        }
        autoComplete="off"
        disabled={formData.IdProyecto === ''}
      >
        {allowedTypes.map((type) => (
          <SearchSelectItem key={type} value={type}>
            {type}
          </SearchSelectItem>
        ))}
      </SearchSelect>
      <SearchSelect
        icon={PuzzleIcon}
        placeholder="Framework utilizado"
        className="mb-4"
        value={formData.Framework}
        onValueChange={(value) =>
          setFormData({ ...formData, Framework: value })
        }
        autoComplete="off"
        disabled={formData.IdProyecto === ''}
      >
        {allowedFrameworks.map((type) => (
          <SearchSelectItem key={type} value={type}>
            {type}
          </SearchSelectItem>
        ))}
      </SearchSelect>
      <TextInput
        value={formData.NombreArchivo}
        onValueChange={(value) =>
          setFormData({ ...formData, NombreArchivo: value })
        }
        placeholder="Nombre del archivo"
        className="mb-4"
        icon={InformationCircleIcon}
        autoComplete="off"
        disabled={formData.IdProyecto === ''}
      />
      <SearchSelect
        icon={CodeIcon}
        placeholder="Lenguaje de programación"
        className="mb-4"
        value={formData.Lenguaje}
        onValueChange={(value) => setFormData({ ...formData, Lenguaje: value })}
        autoComplete="off"
        disabled={formData.IdProyecto === ''}
      >
        {allowedLanguages.map((type) => (
          <SearchSelectItem key={type} value={type}>
            {type}
          </SearchSelectItem>
        ))}
      </SearchSelect>
      <Button
        className="w-1/3 mt-6"
        color="indigo"
        disabled={
          appError || Object.values(formData).some((valor) => valor === '')
        }
        loading={updatingProject}
        loadingText="ACTUALIZANDO..."
        onClick={updateProject}
      >
        ACTUALIZAR
      </Button>
    </div>
  )
}

export default UpdateProject
