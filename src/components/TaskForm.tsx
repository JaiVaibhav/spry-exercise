import React, { useEffect, useState } from 'react'
import { Task, TaskStatus } from '../types'

type Props = {
  initial?: Partial<Task>
  onSubmit: (task: { title: string; description?: string; status: TaskStatus; dueDate: string }) => void
}

export const TaskForm: React.FC<Props> = ({ initial = {}, onSubmit }) => {
  const [title, setTitle] = useState(initial.title ?? '')
  const [description, setDescription] = useState(initial.description ?? '')
  const [status, setStatus] = useState<TaskStatus>((initial.status as TaskStatus) ?? 'Pending')
  const [dueDate, setDueDate] = useState(initial.dueDate ? initial.dueDate.slice(0, 10) : '')
  const [error, setError] = useState('')

  useEffect(() => setError(''), [title, dueDate])

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!title.trim()) return setError('Title is required')
    if (!dueDate) return setError('Due date is required')
    onSubmit({ title: title.trim(), description: description.trim(), status, dueDate })
  }

  return (
    <form className="task-form" onSubmit={submit}>
      {error && <div className="form-error">{error}</div>}
      <label>
        Title *
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <label>
        Description
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <label>
        Status
        <select value={status} onChange={e => setStatus(e.target.value as TaskStatus)}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </label>
      <label>
        Due date *
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      </label>
      <div className="form-actions">
        <button type="submit">Save</button>
      </div>
    </form>
  )
}

export default TaskForm
