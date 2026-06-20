import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGithub, FaRocket, FaBrain, FaChartLine, FaCogs, FaProjectDiagram, FaCommentDots } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const handleGetStarted = () => {
    if (currentUser) {
      navigate('/dashboard')
    } else {
      navigate('/signup')
    }
  }

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Understand Any GitHub Repository in Minutes</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl">
              Reporyx AI analyzes repository architecture, code structure, dependencies, execution flow, and implementation details to help developers onboard faster.
            </p>
            <div className="flex items-center gap-4">
              <button onClick={handleGetStarted} className="btn-primary px-6 py-3 text-lg">Get Started</button>
              <Link to="/signup" className="btn-secondary px-5 py-3 text-lg">Sign Up</Link>
            </div>
            <p className="text-sm text-white/60 mt-4">No credit card required • Works with public & private repositories</p>
          </div>

          <div className="bg-[#0b1220] border border-[#1f2937] rounded-xl p-6">
            <div className="w-full h-56 bg-gradient-to-br from-purple-800 to-blue-700 rounded-lg flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-2xl font-semibold">Live Demo</div>
                <div className="text-sm text-white/70 mt-2">Analyze a GitHub repo in seconds</div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-6 text-center">
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl w-fit mx-auto mb-4">
              <FaGithub className="text-3xl text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Repository Analysis</h3>
            <p className="text-white/70">Analyze any GitHub repository automatically.</p>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl w-fit mx-auto mb-4">
              <FaProjectDiagram className="text-3xl text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Architecture Discovery</h3>
            <p className="text-white/70">Understand frontend, backend, database, and services.</p>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl w-fit mx-auto mb-4">
              <FaCommentDots className="text-3xl text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Code Intelligence</h3>
            <p className="text-white/70">Ask questions about implementation details and business logic.</p>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl w-fit mx-auto mb-4">
              <FaCogs className="text-3xl text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Developer Onboarding</h3>
            <p className="text-white/70">Reduce onboarding time for new developers.</p>
          </div>
        </section>

        <section className="glass-card p-8">
          <h3 className="text-2xl font-semibold text-white mb-4">How It Works</h3>
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-white/80">
            <div className="flex-1">
              <div className="mb-3"><strong>1.</strong> Paste GitHub Repository URL</div>
              <div className="mb-3"><strong>2.</strong> Reporyx AI Analyzes Codebase</div>
              <div className="mb-3"><strong>3.</strong> Explore Architecture & Structure</div>
              <div className="mb-3"><strong>4.</strong> Chat With Your Repository</div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-black/20 p-4 rounded-lg">Simple & fast pipeline</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
