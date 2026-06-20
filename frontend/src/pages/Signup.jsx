import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../components/AuthLayout'
import { EyeIcon, EyeOffIcon } from '../components/icons'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      return false
    }

    if (formData.name.length < 1) {
      setError('Name is required')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!validateForm()) {
      return
    }

  // Client-side validation already ran; prevent duplicate submissions
  setLoading(true)

    try {
      await signup(formData.name, formData.email, formData.password)
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      if (!err.response) {
        setError('Network error. Please try again.')
      } else {
        const data = err.response.data
        const detail = data?.detail
        if (typeof detail === 'string') {
          setError(detail)
        } else if (Array.isArray(detail)) {
          setError(detail[0]?.msg || 'Signup failed. Please check your input.')
        } else {
          setError(data?.message || 'Signup failed. Please try again.')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <AuthLayout title="Account Created">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white">Success!</h3>
          <p className="text-white/70">
            Your account has been created successfully. Redirecting to login...
          </p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Create Account">
      <div className="space-y-6">
        <p className="text-center text-white/70 mb-2">Create an account to start analyzing repositories and asking code questions.</p>

        {error && (
          <div className="p-3 bg-red-600/10 border border-red-500/30 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/70 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field bg-white/5 placeholder-white/30"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-white/70 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field bg-white/5 placeholder-white/30"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="relative flex flex-col gap-2">
            <label className="text-xs text-white/70 font-medium">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field pr-10 bg-white/5 placeholder-white/30"
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
            <p className="text-white/50 text-xs mt-1">Minimum 8 characters</p>
          </div>

          <div className="relative flex flex-col gap-2">
            <label className="text-xs text-white/70 font-medium">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-field pr-10 bg-white/5 placeholder-white/30"
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
            className="w-full btn-primary shadow-lg transform-gpu hover:-translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="flex items-center justify-center">
          <p className="text-center text-white/70 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Signup
