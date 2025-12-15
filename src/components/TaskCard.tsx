import React from 'react'
import { Task } from '../types'

export const TaskCard: React.FC<{
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-card">
      <div className="card-accent" />
      <div className="task-body">
        <div className="task-main">
          <h3>{task.title}</h3>
          <div className="task-meta">
            <span className={`status ${task.status.replace(' ', '-').toLowerCase()}`}>{task.status}</span>
            <time>{new Date(task.dueDate).toLocaleDateString()}</time>
          </div>
        </div>
        {task.description && <p className="task-desc">{task.description}</p>}
        <div className="task-actions">
          <button onClick={() => onEdit(task)} className="muted">Edit</button>
          <button onClick={() => onDelete(task.id)} className="danger">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
