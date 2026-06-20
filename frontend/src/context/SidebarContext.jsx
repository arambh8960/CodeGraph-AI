import React, { createContext, useContext, useEffect, useState } from 'react'

const SidebarContext = createContext(null)

export const useSidebar = () => {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider')
  return ctx
}

export const SidebarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('sidebarCollapsed')
      if (raw !== null) setCollapsed(raw === 'true')
    } catch (e) {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('sidebarCollapsed', collapsed ? 'true' : 'false')
    } catch (e) {}
  }, [collapsed])

  const toggle = () => setCollapsed((s) => !s)
  const openMobile = () => setMobileOpen(true)
  const closeMobile = () => setMobileOpen(false)

  return (
    <SidebarContext.Provider value={{ collapsed, toggle, mobileOpen, openMobile, closeMobile }}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarContext
