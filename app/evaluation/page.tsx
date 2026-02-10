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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Crack It Bot Icon */}
          <div className="flex justify-center mb-4">
            <div className="crack-it-icon-animate">
              <CrackItIcon size={96} />
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
            .crack-it-icon-animate {
              animation: wiggle 2s ease-in-out infinite, float 3s ease-in-out infinite;
              filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.2));
            }
          `}</style>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Innovation StarterKit
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Evaluation Access
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
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
                <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3 animate-slideDown">
                  <p className="text-sm text-amber-800">
                    Please contact <strong>Hua Minh Tri (BGSV/PJ-NE)</strong> to request your evaluation access code.
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
    </div>
  )
}
