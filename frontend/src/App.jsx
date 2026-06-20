import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { useSidebar } from './context/SidebarContext'
import { RepositoryProvider } from './context/RepositoryContext'
import { SidebarProvider } from './context/SidebarContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Summary from './pages/Summary'
import AskRepository from './pages/AskRepository'
import Structure from './pages/Structure'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <RepositoryProvider>
        <SidebarProvider>
          <Router>
            {/* MainLayout uses the SidebarContext hook (must be inside SidebarProvider) */}
            <MainLayout />
          </Router>
        </SidebarProvider>
      </RepositoryProvider>
    </AuthProvider>
  )
}

function MainLayout() {
  const { collapsed } = useSidebar()
  const leftMargin = collapsed ? 80 : 280

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar />
      <div style={{ marginLeft: leftMargin, width: `calc(100% - ${leftMargin}px)`, transition: 'margin 0.3s ease, width 0.3s ease' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/summary"
            element={
              <ProtectedRoute>
                <Summary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ask"
            element={
              <ProtectedRoute>
                <AskRepository />
              </ProtectedRoute>
            }
          />
          <Route
            path="/structure"
            element={
              <ProtectedRoute>
                <Structure />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
