'use client'

import Link from 'next/link'
import { FaPlay, FaRobot, FaDownload } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 bg-black bg-opacity-50">
        <div className="text-2xl font-bold text-white">Vidcraft</div>
        <div className="space-x-4">
          <Link href="/login" className="text-white hover:text-purple-400">
            Login
          </Link>
          <Link href="/signup" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Generate Videos with AI
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Transform your text into engaging videos in seconds. Perfect for content creators.
          </p>
          <div className="space-x-4">
            <Link
              href="/signup"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 font-semibold"
            >
              Get Started Free
            </Link>
            <Link
              href="#features"
              className="inline-block border-2 border-purple-600 text-purple-400 px-8 py-3 rounded-lg hover:bg-purple-600 hover:text-white font-semibold"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="grid md:grid-cols-3 gap-8 my-20">
          <div className="bg-slate-800 p-8 rounded-lg border border-purple-500 hover:border-purple-300 transition">
            <FaPlay className="text-4xl text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Text to Video</h3>
            <p className="text-gray-400">
              Simply describe your video idea in text, and AI will create it for you in minutes.
            </p>
          </div>

          <div className="bg-slate-800 p-8 rounded-lg border border-purple-500 hover:border-purple-300 transition">
            <FaRobot className="text-4xl text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">AI Voices</h3>
            <p className="text-gray-400">
              Choose from multiple AI voices for your video narration. Support for multiple languages.
            </p>
          </div>

          <div className="bg-slate-800 p-8 rounded-lg border border-purple-500 hover:border-purple-300 transition">
            <FaDownload className="text-4xl text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Easy Download</h3>
            <p className="text-gray-400">
              Download your videos in HD quality optimized for YouTube, TikTok, and Instagram.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-12 rounded-lg text-center mt-20">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Create Amazing Videos?
          </h2>
          <p className="text-lg text-gray-100 mb-6">
            Join thousands of content creators using Vidcraft to generate videos effortlessly.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold"
          >
            Start Creating Now
          </Link>
        </div>
      </div>
    </div>
  )
}