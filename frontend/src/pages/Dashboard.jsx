import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import api from '../services/api'
import RepositoryAnalyzer from '../components/RepositoryAnalyzer'
import RepositoryTree from '../components/RepositoryTree'
import RepositoryChat from '../components/RepositoryChat'
import ReactMarkdown from 'react-markdown'
import { useRepository } from '../context/RepositoryContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { currentUser, logout } = useAuth()
  const [backendStatus, setBackendStatus] = useState('loading')
  const [backendMessage, setBackendMessage] = useState('')

  useEffect(() => {
    checkBackendHealth()
  }, [])

  const checkBackendHealth = async () => {
    try {
      const response = await api.get('/health')
      if (response.data.status === 'success') {
        setBackendStatus('connected')
        setBackendMessage(response.data.message)
      } else {
        setBackendStatus('error')
        setBackendMessage('Backend returned unexpected status')
      }
    } catch (error) {
      setBackendStatus('error')
      setBackendMessage('Unable to connect to backend')
    }
  }

  // futureFeatures removed — Dashboard shows only real data from analysis

  const { activeRepo } = useRepository()
  const navigate = useNavigate()
  const analysis = activeRepo

  return (
    <div className="min-h-screen bg-[#0B1020]">
      <main className="p-8">
          {/* Top Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
              <p className="text-sm text-white/60">Manage repositories, run analysis and chat with your code.</p>
            </div>
            {/* Navbar includes logout; no logout button here */}
          </div>

          {/* Analyze Repository Card (lift result up) */}
          <div className="mb-6">
            <RepositoryAnalyzer onResult={(res) => {}} showDetails={false} />
          </div>

          {/* Repository Overview Stats (show only if analysis exists) */}
          {analysis && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4">
                <h4 className="text-xs text-white/60">Repository</h4>
                <div className="text-sm text-white font-medium">{analysis.repo_name}</div>
              </div>
              <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4">
                <h4 className="text-xs text-white/60">Files</h4>
                <div className="text-sm text-white font-medium">{analysis.file_count}</div>
              </div>
              <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4">
                <h4 className="text-xs text-white/60">Folders</h4>
                <div className="text-sm text-white font-medium">{analysis.folder_count}</div>
              </div>
              <div className="bg-[#111827] border border-[#1F2937] rounded-lg p-4">
                <h4 className="text-xs text-white/60">Technologies</h4>
                <div className="text-sm text-white font-medium">{(analysis.technologies || []).join(', ')}</div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate('/summary')} className="px-4 py-2 bg-[#111827] border border-[#1F2937] rounded-md text-white">Open Summary</button>
            <button onClick={() => navigate('/ask')} className="px-4 py-2 bg-[#111827] border border-[#1F2937] rounded-md text-white">Open Chat Assistant</button>
            <button onClick={() => navigate('/structure')} className="px-4 py-2 bg-[#111827] border border-[#1F2937] rounded-md text-white">View Structure</button>
          </div>
      </main>
    </div>
  )
}

export default Dashboard
