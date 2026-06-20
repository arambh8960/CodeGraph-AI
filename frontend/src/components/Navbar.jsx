import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useRepository } from '../context/RepositoryContext'
import { useSidebar } from '../context/SidebarContext'
import { FaCode, FaUser, FaSignOutAlt } from 'react-icons/fa'

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const { clearActiveRepository } = useRepository()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    try {
      clearActiveRepository()
    } catch (e) {}
    navigate('/')
  }

  const { openMobile } = useSidebar()

  return (
    <nav className="glass-card mx-4 px-6 py-4 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 group">
          <FaCode className="text-2xl text-blue-400 group-hover:text-purple-400 transition-colors" />
          <div>
            <div className="text-2xl font-bold gradient-text">Reporyx AI</div>
            <div className="text-xs text-white/60">Repository Intelligence Platform</div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <div className="flex items-center space-x-2 text-white/80">
                <FaUser className="text-blue-400" />
                <span className="font-medium">{currentUser.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="btn-secondary flex items-center space-x-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
