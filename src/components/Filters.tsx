import React from 'react'
import { TaskStatus } from '../types'

export const Filters: React.FC<{
  status: TaskStatus | 'All'
  onStatusChange: (s: TaskStatus | 'All') => void
  sortAsc: boolean
  onSortChange: (asc: boolean) => void
}> = ({ status, onStatusChange, sortAsc, onSortChange }) => {
  return (
    <div className="filters">
      <div className="filter-group">
        <label>Filter:</label>
        <select value={status} onChange={e => onStatusChange(e.target.value as any)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Sort by due date:</label>
        <button onClick={() => onSortChange(!sortAsc)}>{sortAsc ? 'Oldest' : 'Newest'}</button>
      </div>
    </div>
  )
}

export default Filters
