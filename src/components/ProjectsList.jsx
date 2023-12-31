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

export default function ProjectsList({projectsData}) {
  const [selectedProjectsIds, setSelectedProjectsIds] = useState([])

  const uniqueProjectIds =  projectsData
    .map((item) => item.IdProyecto)
    .filter((value, index, self) => self.indexOf(value) === index)

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
      <Table className="mt-12 h-3/4 overflow-auto no-scrollbar">
        <TableBody>
          {projectsData
            .filter((item) => isProjectSelected(item))
            .map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.IdProyecto}</TableCell>
                <TableCell className="text-right">
                  {item.IdAplicacion}
                </TableCell>
                <TableCell className="text-right">
                  {item.TipoAplicacion}
                </TableCell>
                <TableCell className="text-right">{item.Framework}</TableCell>
                <TableCell className="text-right">{item.Lenguaje}</TableCell>
                <TableCell className="text-right">
                  {item.Breakpoints.length}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  )
}