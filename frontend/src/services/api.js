import axios from 'axios'

// Create axios instance with base URL from environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized, clear token and redirect to login for protected routes.
    // But avoid redirecting when the request itself is an auth attempt (login/signup)
    // to prevent the login page from reloading when backend returns 401 for invalid credentials.
    try {
      const status = error.response?.status
      const reqUrl = error.config?.url || ''

      const isAuthEndpoint = reqUrl.includes('/auth/login') || reqUrl.includes('/auth/signup')

      if (status === 401 && !isAuthEndpoint) {
        // Clear token and redirect to login for other requests
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    } catch (e) {
      // Swallow any errors here to avoid interfering with the caller
      console.error('Error in response interceptor:', e)
    }
    return Promise.reject(error)
  }
)

export default api
