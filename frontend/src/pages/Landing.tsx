import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { ArrowRight, BarChart3, Binary, FileText, LayoutDashboard, ShieldCheck, Zap } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard')
      }
      setLoading(false)
    })
  }, [navigate])

  if (loading) return null

  return (
    <div className="min-h-screen bg-white text-navy font-sans selection:bg-gold selection:text-navy">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-rule px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">IU</div>
          <span className="font-black text-xl tracking-tight uppercase">InUnity <span className="text-gold">Profiler</span></span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/login')}
            className="text-xs font-bold uppercase tracking-widest text-silver hover:text-navy transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-navy text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-navyLight transition-all shadow-lg shadow-navy/20"
          >
            Enter Platform
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full -mr-96 -mt-96"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal/5 blur-[100px] rounded-full -ml-64 -mb-64"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-2 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap size={14} className="text-gold" />
            <span className="text-[10px] font-bold text-gold uppercase tracking-widest">v1.2 Now Live • Enhanced AI Roadmaps</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Precision Diagnostic. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy via-navyLight to-teal">Accelerated Incubation.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-silver text-lg md:text-xl font-medium leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
            High-density evaluation and AI-powered roadmaps for next-generation startups. 
            Standardizing the diagnostic process for the modern startup ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-700 delay-300">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto bg-navy text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-navyLight transition-all shadow-2xl shadow-navy/20 group"
            >
              Start Diagnostic <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="w-full sm:w-auto bg-white border border-rule text-navy px-10 py-5 rounded-2xl font-bold hover:bg-smoke transition-all shadow-xl"
            >
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6 bg-smoke/50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[10px] font-black text-silver uppercase tracking-[0.3em] mb-4">Core Capabilities</h2>
            <h3 className="text-4xl font-black tracking-tight">The Evolution of Startup Evaluation</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="text-gold" size={24} />,
                title: "7-Section Diagnostic",
                desc: "Comprehensive evaluation from problem-solution fit to investor readiness levels (TRL/BRL/CRL)."
              },
              {
                icon: <Binary className="text-teal" size={24} />,
                title: "AI-Powered Analysis",
                desc: "One-click synthesis of startup strengths and critical gaps using advanced LLM models."
              },
              {
                icon: <FileText className="text-purple" size={24} />,
                title: "Report Generation",
                desc: "Instantly produce high-fidelity PDF diagnosis reports and structured Excel exports."
              }
            ].map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl border border-rule shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
                <div className="w-14 h-14 bg-smoke rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {f.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{f.title}</h4>
                <p className="text-silver text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Ecosystem */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-navy rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
          <ShieldCheck size={48} className="mx-auto text-gold mb-8 opacity-50" />
          <h3 className="text-3xl md:text-5xl font-black tracking-tight mb-8">Ready to assess your portfolio?</h3>
          <p className="text-silver text-lg mb-12 opacity-80">Join InUnity in standardizing diagnostic excellence.</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-gold text-navy px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-gold/20"
          >
            Enter Platform Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-rule text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-6 h-6 bg-navy rounded-lg flex items-center justify-center text-white font-black text-[10px]">IU</div>
          <span className="font-extrabold text-sm uppercase tracking-widest text-navy">InUnity <span className="text-gold">Profiler</span></span>
        </div>
        <p className="text-[10px] font-bold text-silver uppercase tracking-[0.2em]">© 2026 InUnity Private Limited • All Rights Reserved</p>
      </footer>
    </div>
  )
}
