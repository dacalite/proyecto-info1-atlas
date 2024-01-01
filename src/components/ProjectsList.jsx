'use client'

import { useState } from 'react'
import {
  Card,
  Table,
  TableRow,
  TableCell,
  TableBody,
  MultiSelect,
  MultiSelectItem,
} from '@tremor/react'

export default function ProjectsList({projectsData, uniqueProjectIds}) {
  const [selectedProjectsIds, setSelectedProjectsIds] = useState([])

  const isProjectSelected = (project) => {
    if (
      selectedProjectsIds.includes(project.IdProyecto) ||
      selectedProjectsIds.length === 0
    ) {
      return true
    } else return false
  }

  return (
    <Card className="w-full h-full relative">
      <MultiSelect
        onValueChange={setSelectedProjectsIds}
        placeholder="Filtrar por proyecto..."
        className="max-w-xs"
      >
        {uniqueProjectIds.map((projectId) => (
          <MultiSelectItem key={projectId} value={projectId}>
            {projectId}
          </MultiSelectItem>
        ))}
      </MultiSelect>
      <div className='w-full text-gray-600 font-bold flex justify-between mt-10 pr-12 pl-4 mb-4'>
          <p>Id Proyecto</p>
          <p>Id Aplicación</p>
          <p>Tipo</p>
          <p>Framework</p>
          <p>Lenguaje</p>
          <p>Breakpoints</p>
        </div>
      <Table className=" h-3/4 overflow-auto no-scrollbar">
        <TableBody>
          {projectsData
            .filter((item) => isProjectSelected(item))
            .map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.IdProyecto}</TableCell>
                <TableCell className="text-center">
                  {item.IdAplicacion}
                </TableCell>
                <TableCell className="text-center">
                  {item.TipoAplicacion}
                </TableCell>
                <TableCell className="text-left">{item.Framework}</TableCell>
                <TableCell className="text-left">{item.Lenguaje}</TableCell>
                <TableCell className="text-left">
                  {item.Breakpoints.length}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  )
}