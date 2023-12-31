'use client'

import { useState } from 'react'
import {
  CodeIcon,
  DesktopComputerIcon,
  PuzzleIcon,
} from '@heroicons/react/solid'
import { Title, Card, Tab, TabList, TabGroup } from '@tremor/react'
import SelectList from './SelectList'

const categories = [
  { key: 'tipo', name: 'Tipo de aplicación', icon: DesktopComputerIcon },
  { key: 'framework', name: 'Framework', icon: PuzzleIcon },
  { key: 'lenguaje', name: 'Lenguaje', icon: CodeIcon },
]

export default function MultipleSelectList({ projectsData }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedCategory = categories[selectedIndex].key

  return (
    <Card className="w-full h-full relative">
      <Title>Breakpoints por proyecto</Title>
      <TabGroup
        index={selectedIndex}
        onIndexChange={setSelectedIndex}
        className="mt-6"
      >
        <TabList>
          {categories.map((category) => (
            <Tab key={category.key} value={category.key} icon={category.icon}>
              {category.name}
            </Tab>
          ))}
        </TabList>
      </TabGroup>
      <div className="pt-4 w-full h-3/4 overflow-hidden">
        <SelectList filter={selectedCategory} projectsData={projectsData} />
      </div>
    </Card>
  )
}
