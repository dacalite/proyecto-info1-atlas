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

function AddProject({ projectIds, appIds, closeWidget }) {
  const [projectError, setProjectError] = useState(false)
  const [appError, setAppError] = useState(false)
  const [creatingProject, setCreatingProject] = useState(false)
  const { refreshData } = useContext(ReloadContext)

  const createProject = async () => {
    let loadingToast = null
    try {
      loadingToast = toast.loading('Creando proyecto...', {
        style: LOADING_TOAST_STYLE,
        duration: null,
        position: TOAST_POSITION,
      })

      setCreatingProject(true)
      await axios.post('/api/projects', formData)
      setCreatingProject(false)
      
      toast.dismiss(loadingToast)

      closeWidget()
      refreshData()

      toast.success('Proyecto creado correctamente', {
        style: SUCCESS_TOAST_STYLE,
        duration: TOAST_DURATION,
        position: TOAST_POSITION,
      })
    } catch (e) {
      setCreatingProject(false)
      console.log(e)
      toast.dismiss(loadingToast)
      toast.error('Error al crear el proyecto', {
        style: ERROR_TOAST_STYLE,
        duration: TOAST_DURATION,
        position: TOAST_POSITION,
      })
    }
  }

  const [formData, setFormData] = useState({
    IdProyecto: '',
    IdAplicacion: '',
    TipoAplicacion: '',
    Framework: '',
    NombreArchivo: '',
    Lenguaje: '',
  })

  useEffect(() => {
    if (
      formData.IdProyecto !== '' &&
      projectIds.includes(formData.IdProyecto)
    ) {
      setProjectError(true)
    } else {
      setProjectError(false)
    }
  }, [projectIds, formData.IdProyecto])

  useEffect(() => {
    if (
      formData.IdAplicacion !== '' &&
      appIds.includes(formData.IdAplicacion)
    ) {
      setAppError(true)
    } else {
      setAppError(false)
    }
  }, [appIds, formData.IdAplicacion])

  return (
    <div className="w-full h-full bg-emerald-100 rounded-3xl flex flex-col justify-start items-center p-10">
      <p className="text-4xl font-semibold text-gray-800 mb-10">
        Añadir proyecto
      </p>
      <TextInput
        onValueChange={(value) =>
          setFormData({ ...formData, IdProyecto: value })
        }
        placeholder="Id del proyecto"
        value={formData.IdProyecto}
        error={projectError}
        errorMessage="El Id introducido ya pertenece a un proyecto"
        className="mb-4"
        icon={BadgeCheckIcon}
        autoComplete="off"
      />
      <TextInput
        onValueChange={(value) =>
          setFormData({ ...formData, IdAplicacion: value })
        }
        placeholder="Id de la aplicación"
        value={formData.IdAplicacion}
        error={appError}
        errorMessage="El Id introducido ya pertenece a una aplicación"
        className="mb-4"
        icon={BadgeCheckIcon}
        autoComplete="off"
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
      />
      <SearchSelect
        icon={CodeIcon}
        placeholder="Lenguaje de programación"
        className="mb-4"
        value={formData.Lenguaje}
        onValueChange={(value) => setFormData({ ...formData, Lenguaje: value })}
        autoComplete="off"
      >
        {allowedLanguages.map((type) => (
          <SearchSelectItem key={type} value={type}>
            {type}
          </SearchSelectItem>
        ))}
      </SearchSelect>
      <Button
        className="w-1/3 mt-6"
        color="emerald"
        disabled={
          projectError ||
          appError ||
          Object.values(formData).some((valor) => valor === '')
        }
        loading={creatingProject}
        loadingText="CREANDO..."
        onClick={createProject}
      >
        CREAR
      </Button>
    </div>
  )
}

export default AddProject
