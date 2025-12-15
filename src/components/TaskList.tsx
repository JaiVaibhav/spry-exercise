import React from 'react'
import { Task } from '../types'
import TaskCard from './TaskCard'

export const TaskList: React.FC<{
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}> = ({ tasks, onEdit, onDelete }) => {
  if (tasks.length === 0) return <div className="empty">No tasks found.</div>
  return (
    <div className="task-list">
      {tasks.map(t => (
        <TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default TaskList
