import React, { useMemo, useState } from 'react'
import { useTaskDispatch, useTaskState } from '../context/TaskContext'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import Filters from '../components/Filters'
import Modal from '../components/Modal'
import { Task } from '../types'

export const AllTasks: React.FC = () => {
  const { tasks } = useTaskState()
  const dispatch = useTaskDispatch()

  const [filter, setFilter] = useState<'All' | any>('All')
  const [sortAsc, setSortAsc] = useState(true)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)

  const visible = useMemo(() => {
    let list = tasks.slice()
    if (filter !== 'All') list = list.filter(t => t.status === filter)
    list.sort((a, b) => (sortAsc ? a.dueDate.localeCompare(b.dueDate) : b.dueDate.localeCompare(a.dueDate)))
    return list
  }, [tasks, filter, sortAsc])

  const openNew = () => {
    setEditing(null)
    setOpen(true)
  }

  const handleSubmit = (data: any) => {
    if (editing) {
      dispatch({ type: 'update', id: editing.id, task: data })
    } else {
      dispatch({ type: 'add', task: { ...data } })
    }
    setOpen(false)
  }

  const handleEdit = (t: Task) => {
    setEditing(t)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this task?')) dispatch({ type: 'delete', id })
  }

  return (
    <div>
      <div className="topbar">
        <h2>All Tasks</h2>
        <div>
          <button onClick={openNew}>+ New Task</button>
        </div>
      </div>
      <Filters status={filter} onStatusChange={setFilter} sortAsc={sortAsc} onSortChange={setSortAsc} />
      <TaskList tasks={visible} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal open={open} onClose={() => setOpen(false)}>
        <TaskForm initial={editing ?? undefined} onSubmit={handleSubmit} />
      </Modal>
    </div>
  )
}

export default AllTasks
