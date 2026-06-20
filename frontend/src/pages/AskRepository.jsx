import React from 'react'
import RepositoryChat from '../components/RepositoryChat'
import { useRepository } from '../context/RepositoryContext'

const AskRepository = () => {
  const { activeRepo } = useRepository()
  const analysis = activeRepo || JSON.parse(localStorage.getItem('lastAnalysis') || 'null')

  if (!analysis) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold text-white mb-4">Ask Repository</h2>
        <div className="text-white">No repository analyzed yet. Please run analysis from Dashboard.</div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-white mb-6">Chat — {analysis.repo_name}</h2>
      <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
        <RepositoryChat repoName={analysis.repo_name} persistedMessages={analysis.chatMessages || []} />
      </div>
    </div>
  )
}

export default AskRepository
