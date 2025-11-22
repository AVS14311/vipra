import { useState, useEffect } from 'react'

function PasswordPrompt({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [hackText, setHackText] = useState('')
  const [showWarning, setShowWarning] = useState(true)

  useEffect(() => {
    const hackMessages = [
      '⚠️ WARNING: SYSTEM BREACH DETECTED ⚠️',
      '🚨 SECURITY ALERT: UNAUTHORIZED ACCESS ATTEMPT 🚨',
      '🔴 YOUR WEBSITE HAS BEEN COMPROMISED 🔴',
      '⚠️ DO NOT ENTER ANY SENSITIVE INFORMATION ⚠️',
      '🚨 SYSTEM HACKED - PROCEED WITH CAUTION 🚨'
    ]
    
    let currentIndex = 0
    const interval = setInterval(() => {
      setHackText(hackMessages[currentIndex])
      currentIndex = (currentIndex + 1) % hackMessages.length
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === 'Vipra' || password === 'vipra') {
      onSuccess()
    } else {
      setPassword('')
      // No alert, just clear the password field
    }
  }

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
      <div className="bg-red-900 border-4 border-red-500 p-8 rounded-lg max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-red-400 text-2xl font-bold mb-4 animate-pulse">
            {hackText}
          </div>
          <div className="text-red-300 text-lg mb-4">
            🔴 SYSTEM COMPROMISED 🔴
          </div>
          <div className="text-yellow-400 text-sm mb-6">
            ⚠️ DO NOT ENTER ANY PERSONAL INFORMATION ⚠️
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-red-300 text-sm font-bold mb-2">
              ACCESS CODE REQUIRED:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black border-2 border-red-500 text-white rounded focus:outline-none focus:border-red-400 text-center text-lg font-mono"
              placeholder="Enter access code..."
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors duration-200"
          >
            VERIFY ACCESS
          </button>
        </form>
        
        <div className="mt-6 text-center text-red-400 text-xs">
          🚨 SECURITY BREACH DETECTED 🚨
        </div>
      </div>
    </div>
  )
}

export default PasswordPrompt

