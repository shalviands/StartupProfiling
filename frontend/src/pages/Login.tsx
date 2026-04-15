import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Key, Mail, Loader2, ArrowRight } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      window.location.href = '/'
    } catch (err: any) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 blur-[120px] rounded-full -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal/10 blur-[120px] rounded-full -ml-64 -mb-64"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 pb-0 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center text-navy font-black text-2xl shadow-lg mb-6">IU</div>
            <h1 className="text-2xl font-black text-navy tracking-tight mb-2">Internal Access</h1>
            <p className="text-silver text-sm">Please sign in to the Startup Diagnosis Profiler.</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {error && (
              <div className="p-4 bg-coralLight border border-coral text-coral text-xs font-bold rounded-xl animate-in fade-in zoom-in duration-300">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-silver uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver" />
                  <input 
                    type="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-smoke border border-rule rounded-xl py-4 pl-12 pr-4 text-navy font-medium focus:ring-2 focus:ring-gold outline-none transition-all"
                    placeholder="name@inunity.in"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-silver uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver" />
                  <input 
                    type="password" required
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-smoke border border-rule rounded-xl py-4 pl-12 pr-4 text-navy font-medium focus:ring-2 focus:ring-gold outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-navy hover:bg-navyLight text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-xl transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
              {loading ? 'Authenticating...' : 'Sign In Now'}
            </button>
          </form>

          <footer className="p-6 bg-smoke/50 border-t border-rule text-center">
            <p className="text-[10px] text-silver uppercase tracking-widest font-bold">InUnity Private Limited</p>
          </footer>
        </div>
        
        <div className="mt-8 flex justify-center gap-6 opacity-30 grayscale pointer-events-none">
          {/* Mock Logos */}
          <div className="w-20 h-8 bg-white/20 rounded-md"></div>
          <div className="w-20 h-8 bg-white/20 rounded-md"></div>
          <div className="w-20 h-8 bg-white/20 rounded-md"></div>
        </div>
      </div>
    </div>
  )
}
