'use client'

import { useEffect, useState } from 'react'
import {
  Text,
  Card,
  Flex,
  Select,
  SelectItem,
  Bold,
  BarList,
} from '@tremor/react'


const frameworkCategories = [
  { key: 'all', name: 'Todos' },
  { key: 'react', name: 'React' },
  { key: 'vue', name: 'Vue' },
  { key: 'svelte', name: 'Svelte' },
  { key: 'vanilla', name: 'Vanilla' },
  { key: 'spring', name: 'Spring' },
]

const TypeCategories = [
  { key: 'all', name: 'Todos' },
  { key: 'web', name: 'Web' },
  { key: 'mobile', name: 'Móvil' },
  { key: 'server', name: 'Servidor' },
  { key: 'standalone', name: 'Standalone' },
]

const LanguageCategories = [
  { key: 'all', name: 'Todos' },
  { key: 'javascript', name: 'JavaScript' },
  { key: 'typescript', name: 'TypeScript' },
  { key: 'nodejs', name: 'NodeJS' },
  { key: 'python', name: 'Python' },
  { key: 'kotlin', name: 'Kotlin' },
  { key: 'java', name: 'Java' },
]

const filterByCategory = (filter, category, data) => {
  return  category === 'all' ? data : data.filter((item) => item[filter] === category)
}

const convertToBarData = (data) => {
  return data.map((project) => ({
    id: project._id,
    name: project.IdProyecto,
    value: project.Breakpoints.length,
    tipo: project.TipoAplicacion,
    framework: project.Framework,
    lenguaje: project.Lenguaje,
  }))
}

export default function SelectList({ filter, projectsData }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredData, setFilteredData] = useState(convertToBarData(projectsData))
  const categoriesList =
    filter === 'tipo'
      ? TypeCategories
      : filter === 'framework'
      ? frameworkCategories
      : LanguageCategories

  useEffect(() => {
    setFilteredData(
      filterByCategory(filter, selectedCategory, convertToBarData(projectsData))
    )
  }, [selectedCategory, filter, projectsData])

  return (
    <Card className="w-full h-full">
      <Flex className="space-x-8">
        <Select
          onValueChange={setSelectedCategory}
          placeholder={`Selecciona por ${filter}`}
          className="w-full"
        >
          {categoriesList.map((category) => (
            <SelectItem key={category.key} value={category.key}>
              {category.name}
            </SelectItem>
          ))}
        </Select>
      </Flex>
      <Flex className="mt-8">
        <Text>
          <Bold>Id Proyecto</Bold>
        </Text>
        <Text>
          <Bold>Breakpoints</Bold>
        </Text>
      </Flex>
      <BarList
        data={filteredData}
        showAnimation={true}
        className="mt-4 overflow-auto h-3/4 no-scrollbar"
      />
    </Card>
  )
}
