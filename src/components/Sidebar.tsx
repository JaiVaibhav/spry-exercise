import React from 'react'
import { Link } from 'react-router-dom'
import { ListIcon, CheckIcon } from './Icons'

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">S</div>
        <div className="brand-text">
          <strong>Spry</strong>
          <small>Tasks</small>
        </div>
      </div>
      <nav className="side-nav">
        <Link to="/" className="side-link">
          <ListIcon />
          <span>All Tasks</span>
        </Link>
        <Link to="/completed" className="side-link">
          <CheckIcon />
          <span>Completed</span>
        </Link>
      </nav>
      <div className="sidebar-footer">Built for demo • stores data locally</div>
    </aside>
  )
}

export default Sidebar
