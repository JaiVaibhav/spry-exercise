import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { TaskProvider, useTaskState } from './context/TaskContext'
import AllTasks from './pages/AllTasks'
import CompletedTasks from './pages/CompletedTasks'
import Sidebar from './components/Sidebar'

const Summary: React.FC = () => {
  const { tasks } = useTaskState()
  const pending = tasks.filter(t => t.status === 'Pending').length
  const inProgress = tasks.filter(t => t.status === 'In Progress').length
  const completed = tasks.filter(t => t.status === 'Completed').length
  return (
    <div className="summary">
      <div>Pending: <strong>{pending}</strong></div>
      <div>In Progress: <strong>{inProgress}</strong></div>
      <div>Completed: <strong>{completed}</strong></div>
    </div>
  )
}

function AppInner() {
  return (
    <div className="app-container layout-with-sidebar">
      <Sidebar />
      <div className="content">
        <header className="app-header">
          <h1>Task Management Dashboard</h1>
          <Summary />
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<AllTasks />} />
            <Route path="/completed" element={<CompletedTasks />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <TaskProvider>
      <AppInner />
    </TaskProvider>
  )
}
