export const examples = {
	quickPreview: `import { Chip } from '@tasteee/zest'

export function ChipDemo() {
  return <Chip>Filter</Chip>
}`,

	usageImport: `import { Chip } from '@tasteee/zest'`,

	usage: `<Chip>Filter</Chip>`,

	defaultChip: `<Chip>Filter</Chip>`,

	selected: `<Chip isSelected>Applied</Chip>`,

	disabled: `<Chip disabled>Unavailable</Chip>`,

	allStates: `<div className="flex items-center gap-3">
  <Chip>Default</Chip>
  <Chip isSelected>Selected</Chip>
  <Chip disabled>Disabled</Chip>
</div>`,

	withIcon: `import { Tag } from '@phosphor-icons/react'

<div className="flex items-center gap-3">
  <Chip>
    <Tag />
    Label
  </Chip>
  <Chip isSelected>
    <Tag />
    Applied
  </Chip>
</div>`,

	filterGroup: `import { useState } from 'react'
import { Chip } from '@tasteee/zest'

const FILTERS = ['All', 'Design', 'Engineering', 'Marketing', 'Product']

export function FilterGroup() {
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <Chip
          key={filter}
          isSelected={activeFilter === filter}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </Chip>
      ))}
    </div>
  )
}`,

	multiSelect: `import { useState } from 'react'
import { Chip } from '@tasteee/zest'

const TAGS = ['React', 'TypeScript', 'CSS', 'Node', 'GraphQL']

export function TagSelector() {
  const [selected, setSelected] = useState<string[]>([])

  const handleToggle = (tag: string) => {
    setSelected((previous) => {
      const isAlreadySelected = previous.includes(tag)
      if (isAlreadySelected) return previous.filter((item) => item !== tag)
      return [...previous, tag]
    })
  }

  return (
    <div className="flex flex-wrap gap-2">
      {TAGS.map((tag) => (
        <Chip
          key={tag}
          isSelected={selected.includes(tag)}
          onClick={() => handleToggle(tag)}
        >
          {tag}
        </Chip>
      ))}
    </div>
  )
}`
} as const
