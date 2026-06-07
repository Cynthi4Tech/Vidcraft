'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaVideo, FaWandMagicSparkles, FaImage, FaMicrophone, FaMusic, FaPlay } from 'react-icons/fa'

export default function VideoGenerator() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    text_input: '',
    template: 'general',
    voice: 'en-US-Neural2-C',
    videoLength: '30',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const templates = [
    { id: 'general', name: 'General', description: 'Best for most video types' },
    { id: 'tutorial', name: 'Tutorial', description: 'Perfect for how-to videos' },
    { id: 'product', name: 'Product Demo', description: 'Showcase your product' },
    { id: 'story', name: 'Story', description: 'Narrative-driven content' },
  ]

  const voices = [
    { id: 'en-US-Neural2-C', name: 'English (US) - Female', lang: '🇺🇸' },
    { id: 'en-GB-Neural2-A', name: 'English (UK) - Female', lang: '🇬🇧' },
    { id: 'es-ES-Neural2-C', name: 'Spanish - Female', lang: '🇪🇸' },
    { id: 'fr-FR-Neural2-A', name: 'French - Female', lang: '🇫🇷' },
    { id: 'de-DE-Neural2-A', name: 'German - Female', lang: '🇩🇪' },
    { id: 'ja-JP-Neural2-B', name: 'Japanese - Female', lang: '🇯🇵' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    if (!formData.title || !formData.text_input) {
      setError('Title and description are required')
      return
    }

    if (formData.text_input.length < 20) {
      setError('Description must be at least 20 characters')
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/api/videos/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          text_input: formData.text_input,
          template_id: formData.template,
          voice_id: formData.voice,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.detail || 'Failed to generate video')
        return
      }

      setSuccess('Video generation started! Redirecting to dashboard...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (err) {
      setError('Failed to connect to server')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black bg-opacity-50 border-b border-white border-opacity-10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <FaVideo className="text-2xl text-purple-400" />
            <span className="text-2xl font-bold text-white">Vidcraft</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition mb-6">
          <FaArrowLeft /> Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <FaWandMagicSparkles className="text-purple-400" />
            Create Your Video
          </h1>
          <p className="text-gray-400">Describe your video idea and let AI create it for you</p>
        </div>

        {/* Form */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 border border-white border-opacity-20 mb-8">
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-white font-semibold mb-2">Video Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Product Launch Announcement"
                className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-white font-semibold mb-2">Short Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of your video"
                className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
              />
            </div>

            {/* Text Input */}
            <div>
              <label className="block text-white font-semibold mb-2">Video Script/Description *</label>
              <textarea
                name="text_input"
                value={formData.text_input}
                onChange={handleChange}
                placeholder="Describe everything you want to happen in the video. Be detailed about scenes, actions, and messages."
                rows={6}
                className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition resize-none"
              />
              <p className="text-gray-400 text-sm mt-2">
                Character count: {formData.text_input.length} (minimum 20)
              </p>
            </div>

            {/* Grid for selections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Template */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <FaImage /> Video Template
                </label>
                <select
                  name="template"
                  value={formData.template}
                  onChange={handleChange}
                  className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
                >
                  {templates.map((t) => (
                    <option key={t.id} value={t.id} className="bg-slate-800">
                      {t.name} - {t.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Video Length */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <FaPlay /> Video Length
                </label>
                <select
                  name="videoLength"
                  value={formData.videoLength}
                  onChange={handleChange}
                  className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
                >
                  <option value="15" className="bg-slate-800">15 seconds</option>
                  <option value="30" className="bg-slate-800">30 seconds</option>
                  <option value="60" className="bg-slate-800">60 seconds</option>
                </select>
              </div>

              {/* Voice */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <FaMicrophone /> Voice
                </label>
                <select
                  name="voice"
                  value={formData.voice}
                  onChange={handleChange}
                  className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition"
                >
                  {voices.map((v) => (
                    <option key={v.id} value={v.id} className="bg-slate-800">
                      {v.lang} {v.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Background Music */}
              <div>
                <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                  <FaMusic /> Background Music
                </label>
                <select className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition">
                  <option className="bg-slate-800">Upbeat</option>
                  <option className="bg-slate-800">Calm</option>
                  <option className="bg-slate-800">Corporate</option>
                  <option className="bg-slate-800">None</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 mt-8"
            >
              <FaWandMagicSparkles />
              {loading ? 'Generating Video...' : 'Generate Video'}
            </button>
          </form>
        </div>

        {/* Tips */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20">
          <h3 className="text-white font-bold mb-4">💡 Tips for Best Results</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>✅ Be specific and detailed in your description</li>
            <li>✅ Mention specific actions, scenes, and visuals you want to see</li>
            <li>✅ Include key messages you want to convey</li>
            <li>✅ Specify the mood (professional, casual, energetic, etc.)</li>
            <li>✅ Longer descriptions result in better videos</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
