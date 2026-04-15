import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { supabase } from './lib/supabase'
import Profiler from './pages/Profiler'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Landing from './pages/Landing'
import { useAutoSave } from './hooks/useAutoSave'
import { useUIStore } from './store/uiStore'
import Toast from './components/shared/Toast'

const queryClient = new QueryClient()

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!session) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AppContent() {
  useAutoSave()
  const { toast, hideToast } = useUIStore()

  return (
    <>
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
      <Route path="/profiler" element={<AuthGuard><Profiler /></AuthGuard>} />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}
    </>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
