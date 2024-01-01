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
import {
  allowedFrameworks,
  allowedLanguages,
  allowedTypes,
} from '@/utils/allowedTypes'

const frameworkCategories = [
  'Todos',
  ...allowedFrameworks
]

const TypeCategories = [
  'Todos',
  ...allowedTypes
]

const LanguageCategories = [
  'Todos',
  ...allowedLanguages
]

const filterByCategory = (filter, category, data) => {
  return category === 'Todos'
    ? data
    : data.filter((item) => item[filter] === category)
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
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [filteredData, setFilteredData] = useState(
    convertToBarData(projectsData)
  )

  const categoriesList =
    filter === 'tipo'
      ? TypeCategories
      : filter === 'framework'
      ? frameworkCategories
      : LanguageCategories

  useEffect(() => {
  }, [categoriesList])

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
            <SelectItem key={category} value={category}>
              {category}
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
