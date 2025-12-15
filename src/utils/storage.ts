import { Task } from '../types'

const KEY = 'spry.tasks'

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw) as Task[]
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks))
  } catch {}
}
