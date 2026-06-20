import React, { useState, useEffect } from 'react'
import { analyzeRepository } from '../services/repositoryService'
import RepositoryTree from './RepositoryTree'
import RepositoryChat from "./RepositoryChat";
import ReactMarkdown from "react-markdown";
import { useRepository } from '../context/RepositoryContext'


const RepositoryAnalyzer = ({ onResult, showDetails = true, initialUrl = '' }) => {
  const { activeRepo, setActiveRepository } = useRepository()
  const [repoUrl, setRepoUrl] = useState(initialUrl || (activeRepo?.repo_url || ''))
  const [result, setResult] = useState(activeRepo || null)
  const [loading, setLoading] = useState(false)

 const handleAnalyze = async () => {

  console.log("BUTTON CLICKED")

  if (!repoUrl.trim()) {
    alert("Please enter a GitHub repository URL")
    return
  }

  if (loading) return
  setLoading(true)

  try {

    console.log("SENDING REQUEST")

  const response = await analyzeRepository(repoUrl)
    // Keep local result for standalone use
    setResult(response)
    // Inform parent if callback provided
    if (onResult) onResult(response)
    // Persist into repository context (centralized persistence)
    try {
      setActiveRepository({ ...response, repo_url: repoUrl })
    } catch (e) {
      // ignore
    }

  } catch (error) {

    console.log("ERROR =", error)

  } finally {

    setLoading(false)

  }
}

useEffect(() => {
  // keep input in sync when activeRepo changes elsewhere
  if (activeRepo && activeRepo.repo_url && activeRepo.repo_url !== repoUrl) {
    setRepoUrl(activeRepo.repo_url)
    setResult(activeRepo)
  }
}, [activeRepo])

const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    handleAnalyze()
  }
}
  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold text-white mb-4">
        Analyze Repository
      </h2>

      <input
        type="text"
        placeholder="https://github.com/facebook/react"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        className="input-field"
      />

      <button
  onClick={handleAnalyze}
  className="btn-primary mt-4"
  disabled={loading}
>
  {loading ? "Analyzing Repository..." : "Analyze Repository"}
</button>
{loading && (
  <p className="text-white mt-3">
    Cloning repository and analyzing files...
  </p>
)}

      {result && showDetails && (
        <div className="mt-6 text-white space-y-2">
          <p>
            <strong>Status:</strong> {result.status}
          </p>

          <p>
            <strong>Repository:</strong> {result.repo_name}
          </p>

          <p>
            <strong>Files:</strong> {result.file_count}
          </p>

          <p>
            <strong>Folders:</strong> {result.folder_count}
          </p>

          <p>
            <strong>Technologies:</strong>{' '}
            {result.technologies?.length
              ? result.technologies.join(', ')
              : 'Not detected'}
          </p>

          <p>
            <strong>Message:</strong> {result.message}
          </p>
       <div className="mt-6">
  <h3 className="text-xl font-bold text-white mb-3">
    Repository Summary
  </h3>

  <div className="bg-black/20 p-4 rounded-lg text-white">
    <ReactMarkdown>
      {result.summary}
    </ReactMarkdown>
  </div>
</div>

          <RepositoryTree tree={result.tree} />
          <RepositoryChat
  repoName={result.repo_name}
/>
        </div>
      )}
    </div>
  )
}

export default RepositoryAnalyzer