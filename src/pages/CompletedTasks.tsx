import React, { useMemo, useState } from 'react'
import { useTaskDispatch, useTaskState } from '../context/TaskContext'
import TaskList from '../components/TaskList'
import Modal from '../components/Modal'
import TaskForm from '../components/TaskForm'
import { Task } from '../types'

export const CompletedTasks: React.FC = () => {
  const { tasks } = useTaskState()
  const dispatch = useTaskDispatch()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)

  const visible = useMemo(() => tasks.filter(t => t.status === 'Completed'), [tasks])

  const handleEdit = (t: Task) => {
    setEditing(t)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this task?')) dispatch({ type: 'delete', id })
  }

  const handleSubmit = (data: any) => {
    if (editing) dispatch({ type: 'update', id: editing.id, task: data })
    setOpen(false)
  }

  return (
    <div>
      <div className="topbar">
        <h2>Completed Tasks</h2>
      </div>
      <TaskList tasks={visible} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <TaskForm initial={editing ?? undefined} onSubmit={handleSubmit} />
      </Modal>
    </div>
  )
}

export default CompletedTasks
