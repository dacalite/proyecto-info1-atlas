'use client'

import { Card, Grid, Metric, Text } from '@tremor/react'
import { useEffect, useState } from 'react'

const categories = [
  {
    title: 'Proyectos totales',
    metric: '4',
  },
  {
    title: 'Breakpoints totales',
    metric: '243',
  },
  {
    title: 'Proyecto crítico',
    metric: 'AAA',
  },
]

export default function InfoBar({ projectsData }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const projectWithMaxBreakpoints = projectsData
      ? projectsData.reduce((projectWithMostBreakpoints, currentProject) => {
          if (
            currentProject.Breakpoints.length >
            projectWithMostBreakpoints.Breakpoints.length
          ) {
            return currentProject
          }
          return projectWithMostBreakpoints
        }, projectsData[0])
      : null

    const categories = [
      {
        title: 'Proyectos totales',
        metric: projectsData ? projectsData.length : 'Cargando...',
      },
      {
        title: 'Breakpoints totales',
        metric: projectsData
          ? projectsData.reduce(
              (acc, project) => acc + project.Breakpoints.length,
              0
            )
          : 'Cargando...',
      },
      {
        title: 'Proyecto crítico',
        metric: projectWithMaxBreakpoints
          ? projectWithMaxBreakpoints.IdProyecto
          : 'Cargando...',
      },
    ]
    setCategories(categories)
  }, [projectsData])

  return (
    <div className="w-full h-full flex justify-between items-center p-10 pb-0">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-12 w-full">
        {categories.map((item) => (
          <Card key={item.title}>
            <Text>{item.title}</Text>
            <Metric>{item.metric}</Metric>
          </Card>
        ))}
      </Grid>
    </div>
  )
}
