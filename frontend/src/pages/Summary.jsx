import React from 'react'
import AuthLayout from '../components/AuthLayout'
import RepositoryTree from '../components/RepositoryTree'
import ReactMarkdown from 'react-markdown'
import { useRepository } from '../context/RepositoryContext'

const Summary = () => {
  const { activeRepo } = useRepository()
  const analysis = activeRepo || JSON.parse(localStorage.getItem('lastAnalysis') || 'null')

  if (!analysis) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold text-white mb-4">Repository Summary</h2>
        <div className="text-white">No repository analyzed yet. Please run analysis from Dashboard.</div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-white mb-6">Repository Summary — {analysis.repo_name}</h2>
      <div className="space-y-6">
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white">Project Overview</h3>
          <div className="mt-3 text-white/70">
            <ReactMarkdown>{analysis.summary || 'No summary available.'}</ReactMarkdown>
          </div>
        </div>

        {analysis.tech_stack && (
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white">Tech Stack</h3>
            <div className="mt-2 text-white/70">{analysis.tech_stack.join(', ')}</div>
          </div>
        )}

        {analysis.core_features && (
          <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white">Core Features</h3>
            <ul className="mt-2 list-disc list-inside text-white/70">
              {analysis.core_features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Repository Structure removed from Summary page as it has its own dedicated page */}
      </div>
    </div>
  )
}

export default Summary
