import React, { createContext, useContext, useState, useEffect } from 'react'

const RepositoryContext = createContext(null)

export const useRepository = () => {
  const ctx = useContext(RepositoryContext)
  if (!ctx) throw new Error('useRepository must be used within RepositoryProvider')
  return ctx
}

export const RepositoryProvider = ({ children }) => {
  const [activeRepo, setActiveRepo] = useState(null)

  useEffect(() => {
    // Restore last analysis from localStorage on mount
    try {
      const raw = localStorage.getItem('lastAnalysis')
      if (raw) {
        const parsed = JSON.parse(raw)
        // ensure chatMessages array exists
        parsed.chatMessages = parsed.chatMessages || []
        setActiveRepo(parsed)
      }
    } catch (e) {
      // ignore
    }
  }, [])

  const persist = (repo) => {
    try {
      localStorage.setItem('lastAnalysis', JSON.stringify(repo))
    } catch (e) {
      // ignore
    }
  }

  const setActiveRepository = (repoObj) => {
    // Ensure chatMessages preserved if switching back to same repo
    const prevMessages = activeRepo?.repo_name === repoObj.repo_name ? (activeRepo.chatMessages || []) : []
    const newRepo = { ...repoObj, chatMessages: prevMessages }
    setActiveRepo(newRepo)
    persist(newRepo)
  }

  const clearActiveRepository = () => {
    setActiveRepo(null)
    try {
      localStorage.removeItem('lastAnalysis')
    } catch (e) {}
  }

  const addChatMessage = (message) => {
    if (!activeRepo) return
    const updated = { ...activeRepo, chatMessages: [...(activeRepo.chatMessages || []), message] }
    setActiveRepo(updated)
    persist(updated)
  }

  const value = {
    activeRepo,
    setActiveRepository,
    clearActiveRepository,
    addChatMessage,
  }

  return (
    <RepositoryContext.Provider value={value}>
      {children}
    </RepositoryContext.Provider>
  )
}

export default RepositoryContext
