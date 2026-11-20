import { useState } from 'react'
import '@tasteee/zest'

type TaskT = { label: string; isDone: boolean }

const STARTING_TASKS: TaskT[] = [
  { label: 'Reply to Grace', isDone: false },
  { label: 'Review the release notes', isDone: true },
  { label: 'Book the offsite', isDone: false },
  { label: 'Update the changelog', isDone: false }
]

type TaskCheckboxPropsT = { task: TaskT; onToggle: (label: string, isDone: boolean) => void }

const TaskCheckbox = (props: TaskCheckboxPropsT) => {
  const handleChange = (event: CustomEvent<{ checked: boolean }>) => props.onToggle(props.task.label, event.detail.checked)

  return (
    <z-checkbox isChecked={props.task.isDone} onchange={handleChange}>
      {props.task.label}
    </z-checkbox>
  )
}

export const Example = () => {
  const [tasks, setTasks] = useState(STARTING_TASKS)

  const toggleTask = (label: string, isDone: boolean) => {
    const updateTask = (task: TaskT): TaskT => (task.label === label ? { ...task, isDone } : task)
    setTasks((currentTasks) => currentTasks.map(updateTask))
  }

  const openCount = tasks.filter((task) => !task.isDone).length
  const remainingText = `${openCount} left`

  const taskCheckboxes = tasks.map((task) => <TaskCheckbox key={task.label} task={task} onToggle={toggleTask} />)

  return (
    <z-card gap="3" style={{ width: 'min(26rem, 100%)', padding: '1.25rem' }}>
      <z-row alignsX="between" alignsY="center">
        <z-heading size="xs" tag="h2">Today</z-heading>
        <z-text size="sm" color="muted">{remainingText}</z-text>
      </z-row>
      <z-column gap="3">
        {taskCheckboxes}
      </z-column>
    </z-card>
  )
}
