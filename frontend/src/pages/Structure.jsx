import React from 'react'
import RepositoryTree from '../components/RepositoryTree'
import { useRepository } from '../context/RepositoryContext'

const Structure = () => {
  const { activeRepo } = useRepository()
  const analysis = activeRepo || JSON.parse(localStorage.getItem('lastAnalysis') || 'null')

  if (!analysis) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold text-white mb-4">Repository Structure</h2>
        <div className="text-white">No repository analyzed yet. Please run analysis from Dashboard.</div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-white mb-6">Structure — {analysis.repo_name}</h2>
      <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
        <RepositoryTree tree={analysis.tree} />
      </div>
    </div>
  )
}

export default Structure
