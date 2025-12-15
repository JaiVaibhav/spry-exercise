import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { Task } from '../types'
import { loadTasks, saveTasks } from '../utils/storage'
import { v4 as uuidv4 } from 'uuid'

type State = { tasks: Task[] }

type Action =
  | { type: 'load'; tasks: Task[] }
  | { type: 'add'; task: Omit<Task, 'id'> }
  | { type: 'update'; id: string; task: Partial<Task> }
  | { type: 'delete'; id: string }

const initialState: State = { tasks: [] }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'load':
      return { tasks: action.tasks }
    case 'add': {
      const newTask: Task = { id: uuidv4(), ...action.task }
      return { tasks: [...state.tasks, newTask] }
    }
    case 'update': {
      return {
        tasks: state.tasks.map(t => (t.id === action.id ? { ...t, ...action.task } : t)),
      }
    }
    case 'delete':
      return { tasks: state.tasks.filter(t => t.id !== action.id) }
    default:
      return state
  }
}

const TaskStateContext = createContext<State | undefined>(undefined)
const TaskDispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined)

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const tasks = loadTasks()
    if (!tasks || tasks.length === 0) {
      // seed demo tasks for first-run/demo
      const now = new Date()
      const plus3 = new Date(now)
      plus3.setDate(now.getDate() + 3)
      const plus7 = new Date(now)
      plus7.setDate(now.getDate() + 7)
      const demo = [
        { id: uuidv4(), title: 'Set up project', description: 'Initialize repository and scaffold app', status: 'Completed' as const, dueDate: now.toISOString() },
        { id: uuidv4(), title: 'Design task model', description: 'Decide fields and UI components', status: 'In Progress' as const, dueDate: plus3.toISOString() },
        { id: uuidv4(), title: 'Implement Task CRUD', description: '', status: 'Pending' as const, dueDate: plus7.toISOString() },
      ]
      dispatch({ type: 'load', tasks: demo })
    } else {
      dispatch({ type: 'load', tasks })
    }
  }, [])

  useEffect(() => {
    saveTasks(state.tasks)
  }, [state.tasks])

  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>{children}</TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  )
}

export function useTaskState() {
  const ctx = useContext(TaskStateContext)
  if (!ctx) throw new Error('useTaskState must be used within TaskProvider')
  return ctx
}

export function useTaskDispatch() {
  const ctx = useContext(TaskDispatchContext)
  if (!ctx) throw new Error('useTaskDispatch must be used within TaskProvider')
  return ctx
}
