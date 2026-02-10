"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CrackItIcon } from "@/components/text-selection/crack-it-icon"

export default function EvaluationPage() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showContactInfo, setShowContactInfo] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/evaluation/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (data.success) {
        router.push("/challenge")
        router.refresh()
      } else {
        setError("Invalid evaluation code")
      }
    } catch {
      setError("Failed to verify code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blue blob - top left */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-blob-1"></div>
        {/* Purple blob - top right */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-blob-2"></div>
        {/* Pink blob - bottom */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-400/15 rounded-full blur-3xl animate-blob-3"></div>
        {/* Cyan blob - floating */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-400/15 rounded-full blur-3xl animate-blob-4"></div>
      </div>

      {/* Gradient Background Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>

      {/* Main Card */}
      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50">
          {/* Crack It Bot with Pedestal */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Animated glow rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-28 h-28 rounded-full border-2 border-blue-400/30 animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute w-24 h-24 rounded-full border border-purple-400/40 animate-pulse" style={{ animationDuration: '2s' }}></div>
              </div>

              {/* Pedestal glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-24 h-6 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent blur-xl"></div>

              {/* Bot Icon */}
              <div className="crack-it-icon-animate relative z-10">
                <CrackItIcon size={96} />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold text-center mb-2 text-blue-950">
            Innovation StarterKit
          </h1>
          <p className="text-center text-gray-600 mb-8 text-sm font-medium">
            Evaluation Access
          </p>

          {/* Info Box */}
          <div className="bg-blue-50/80 backdrop-blur border border-blue-200/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Evaluation Version</strong><br />
              This application is for evaluation purposes only. Please enter your evaluation code to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                Evaluation Code
              </label>
              <div className="relative">
                <input
                  id="code"
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white/50 backdrop-blur"
                  placeholder="Enter evaluation code"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowContactInfo(!showContactInfo)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  Request code?
                </button>
              </div>
              {showContactInfo && (
                <div className="mt-2 bg-amber-50/90 backdrop-blur border border-amber-200/50 rounded-lg p-3 animate-slideDown">
                  <p className="text-sm text-amber-800">
                    Please contact <strong>Hua Minh Tri (BGSV/PJ-NE)</strong> to request your evaluation access code.
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50/90 backdrop-blur border border-red-200/50 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl"
            >
              {loading ? "Verifying..." : "Access Innovation StarterKit"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Session expires after 24 hours
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-8deg); }
          25% { transform: rotate(8deg) scale(1.05); }
          50% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg) scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes blob-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes blob-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 50px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.9); }
        }
        @keyframes blob-3 {
          0%, 100% { transform: translate(-50%, 0) scale(1); }
          33% { transform: translate(-50%, -30px) scale(1.15); }
          66% { transform: translate(-50%, 20px) scale(0.85); }
        }
        @keyframes blob-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -40px) scale(1.1); }
        }
        .crack-it-icon-animate {
          animation: wiggle 2s ease-in-out infinite, float 3s ease-in-out infinite;
          filter: drop-shadow(0 12px 24px rgba(59, 130, 246, 0.3));
        }
        .animate-blob-1 {
          animation: blob-1 25s ease-in-out infinite;
        }
        .animate-blob-2 {
          animation: blob-2 25s ease-in-out infinite;
        }
        .animate-blob-3 {
          animation: blob-3 20s ease-in-out infinite;
        }
        .animate-blob-4 {
          animation: blob-4 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
