import { createSignal, For } from 'solid-js'
import '@tasteee/zest'

type TaskT = { label: string; isDone: boolean }

const STARTING_TASKS: TaskT[] = [
  { label: 'Reply to Grace', isDone: false },
  { label: 'Review the release notes', isDone: true },
  { label: 'Book the offsite', isDone: false },
  { label: 'Update the changelog', isDone: false }
]

export const Example = () => {
  const [tasks, setTasks] = createSignal(STARTING_TASKS)

  const setTaskDone = (label: string, isDone: boolean) => {
    const updateTask = (task: TaskT): TaskT => (task.label === label ? { ...task, isDone } : task)
    setTasks((currentTasks) => currentTasks.map(updateTask))
  }

  const openCount = () => tasks().filter((task) => !task.isDone).length

  return (
    <z-card gap="3" style="width: min(26rem, 100%); padding: 1.25rem">
      <z-row aligns-x="between" aligns-y="center">
        <z-heading size="xs" tag="h2">Today</z-heading>
        <z-text size="sm" color="muted">{openCount()} left</z-text>
      </z-row>
      <z-column gap="3">
        <For each={tasks()}>
          {(task) => (
            <z-checkbox
              prop:isChecked={task.isDone}
              onChange={(event: CustomEvent<{ checked: boolean }>) => setTaskDone(task.label, event.detail.checked)}
            >
              {task.label}
            </z-checkbox>
          )}
        </For>
      </z-column>
    </z-card>
  )
}
