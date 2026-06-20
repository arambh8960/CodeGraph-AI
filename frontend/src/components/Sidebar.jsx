import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaGithub, FaChartBar, FaComments, FaUserCircle, FaFileAlt, FaBars, FaChevronLeft } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { useSidebar } from '../context/SidebarContext'

const Sidebar = () => {
  const { currentUser, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const { collapsed, toggle, mobileOpen, openMobile, closeMobile } = useSidebar()

  const baseItemClasses = `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${collapsed ? 'justify-center' : ''}`
  const activeClasses = 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_0_12px_rgba(124,58,237,0.25)] border-l-4 border-blue-400'

  // widths for collapsed and expanded
  const expandedWidth = 'w-[280px]'
  const collapsedWidth = 'w-20'

  return (
    <>
      {/* Desktop / tablet sidebar */}
      <aside className={`fixed left-0 top-0 h-screen bg-[#0B1020] border-r border-[#1F2937] text-white flex flex-col justify-between overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-[#071026] transition-[width] duration-300 ease-in-out ${collapsed ? collapsedWidth : expandedWidth}`}>
        <div className={`p-4 ${collapsed ? 'flex flex-col items-center' : 'p-6'}`}>
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} mb-6 w-full`}> 
              <Link to="/" className={`flex items-center ${collapsed ? '' : 'space-x-3'}`}>
                <div className={`w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-md flex items-center justify-center text-white font-bold`}>RP</div>
                {!collapsed && (
                  <div>
                    <h3 className="text-lg font-semibold">Reporyx AI</h3>
                    <p className="text-xs text-white/60">Repository Intelligence Platform</p>
                  </div>
                )}
              </Link>

            {/* collapse toggle */}
            {!collapsed ? (
              <button onClick={toggle} className="text-white/60 hover:text-white p-2">
                <FaChevronLeft />
              </button>
            ) : (
              <button onClick={toggle} className="text-white/60 hover:text-white p-2">
                <FaBars />
              </button>
            )}
          </div>

          <nav className="space-y-2">
            <Link title={collapsed ? 'Dashboard' : ''} to="/dashboard" className={`${baseItemClasses} ${isActive('/dashboard') ? activeClasses : 'hover:bg-[#111827]'}`}>
              <FaChartBar className="text-sm" />
              {!collapsed && <span className="text-sm">Dashboard</span>}
            </Link>
            <Link title={collapsed ? 'Repository Summary' : ''} to="/summary" className={`${baseItemClasses} ${isActive('/summary') ? activeClasses : 'hover:bg-[#111827]'}`}>
              <FaGithub className="text-sm" />
              {!collapsed && <span className="text-sm">Repository Summary</span>}
            </Link>
            <Link title={collapsed ? 'Ask Repository' : ''} to="/ask" className={`${baseItemClasses} ${isActive('/ask') ? activeClasses : 'hover:bg-[#111827]'}`}>
              <FaComments className="text-sm" />
              {!collapsed && <span className="text-sm">Ask Repository</span>}
            </Link>
            <Link title={collapsed ? 'Repository Structure' : ''} to="/structure" className={`${baseItemClasses} ${isActive('/structure') ? activeClasses : 'hover:bg-[#111827]'}`}>
              <FaFileAlt className="text-sm" />
              {!collapsed && <span className="text-sm">Repository Structure</span>}
            </Link>
          </nav>
        </div>

        <div className={`p-4 border-t border-[#1F2937] ${collapsed ? 'flex items-center justify-center' : ''}`}>
          <div className={`flex items-center ${collapsed ? 'flex-col' : ''} gap-3`}> 
            <FaUserCircle className={`text-2xl text-white/80 ${collapsed ? '' : ''}`} />
            {!collapsed && (
              <div>
                <div className="text-sm font-medium">{currentUser?.name || 'User'}</div>
                <div className="text-xs text-white/60">{currentUser?.email}</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={closeMobile} />
          <div className="absolute left-0 top-0 h-full w-72 bg-[#0B1020] border-r border-[#1F2937] p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <Link to="/" className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-md flex items-center justify-center text-white font-bold">RP</div>
                  <div>
                    <h3 className="text-lg font-semibold">Reporyx AI</h3>
                  </div>
              </Link>
              <button onClick={closeMobile} className="p-2 text-white/70">Close</button>
            </div>
            <nav className="space-y-2">
              <Link to="/dashboard" className={baseItemClasses}><FaChartBar /><span className="ml-2">Dashboard</span></Link>
              <Link to="/summary" className={baseItemClasses}><FaGithub /><span className="ml-2">Repository Summary</span></Link>
              <Link to="/ask" className={baseItemClasses}><FaComments /><span className="ml-2">Ask Repository</span></Link>
              <Link to="/structure" className={baseItemClasses}><FaFileAlt /><span className="ml-2">Repository Structure</span></Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar
