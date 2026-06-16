import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../components/AuthLayout'
import { EyeIcon, EyeOffIcon } from '../components/icons'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Do not aggressively clear errors on every keystroke; only clear when user changes input
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Clear any previous non-field errors before submit
    setError('')
    // Run client-side validation first
    if (!validateForm()) return
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      // On success, navigate to dashboard
      navigate('/dashboard')
    } catch (err) {
      // Network error
      if (!err.response) {
        setError('Network error. Please check your internet connection and try again.')
      } else {
        // Backend response handling
        const data = err.response.data
        const detail = data?.detail

        if (typeof detail === 'string') {
          setError(detail)
        } else if (Array.isArray(detail)) {
          // FastAPI validation errors often come as a list of {loc,msg,type}
          setError(detail[0]?.msg || 'Invalid email or password')
        } else if (data?.message) {
          // Some endpoints may return {message: '...'}
          setError(data.message)
        } else {
          setError('Invalid email or password')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return false
    }
    return true
  }

  return (
    <AuthLayout title="Welcome Back">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-white/80 mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-white/80 mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-field pr-10"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 top-9 p-1 text-white/60 hover:text-white"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="text-center text-white/70 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default Login
