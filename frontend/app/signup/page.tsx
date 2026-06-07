'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa'

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (!formData.full_name || !formData.email || !formData.username || !formData.password) {
      setError('All fields are required')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.detail || 'Sign up failed')
        return
      }

      // Save token to localStorage
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))

      setSuccess('Account created successfully! Redirecting...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (err) {
      setError('Failed to connect to server. Make sure backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4 border-b border-white border-opacity-10">
        <Link href="/" className="text-2xl font-bold text-white hover:text-purple-400 transition">
          Vidcraft
        </Link>
        <Link href="/login" className="text-white hover:text-purple-400 transition">
          Already have an account? Login
        </Link>
      </div>

      {/* Sign Up Form */}
      <div className="w-full max-w-md">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 border border-white border-opacity-20">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h1>
          <p className="text-gray-300 text-center mb-8">Join Vidcraft and start creating videos with AI</p>

          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-200 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-white font-semibold mb-2">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3.5 text-purple-400" />
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-white font-semibold mb-2">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3.5 text-purple-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-white font-semibold mb-2">Username</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3.5 text-purple-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white font-semibold mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-purple-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-white font-semibold mb-2">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-purple-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg transition flex items-center justify-center gap-2 mt-6"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
              <FaArrowRight />
            </button>
          </form>

          {/* Terms */}
          <p className="text-gray-400 text-sm text-center mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
