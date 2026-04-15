import React from 'react'
import { Sparkles, Brain, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { useTeamStore } from '../../store/teamStore'
import { useAIAnalysis } from '../../hooks/useAIAnalysis'

export default function AIPanel() {
  const { teams, activeTeamId } = useTeamStore()
  const { analyze, isAnalyzing } = useAIAnalysis()
  
  const team = teams.find(t => t.id === activeTeamId)
  if (!team) return null

  const handleAnalyze = async () => {
    await analyze()
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <div className="p-4 border-b border-rule flex items-center justify-between shadow-sm z-10">
        <h3 className="text-[10px] font-bold text-navy flex items-center gap-2 uppercase tracking-widest">
          <Brain size={14} className="text-purple" />
          AI Diagnostic Insights
        </h3>
        
        <button 
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="px-4 py-2 bg-purple hover:bg-purpleLight hover:text-purple text-white rounded-lg text-[10px] font-bold transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-purple/10 active:scale-95"
        >
          {isAnalyzing ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Sparkles size={12} />
          )}
          {isAnalyzing ? 'Processing...' : 'Auto-Scale Analysis'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {!isAnalyzing ? (
          <>
            {team.analysis ? (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="p-4 bg-smoke border border-rule rounded-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-2 opacity-10">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black text-navy uppercase tracking-widest bg-white px-2 py-0.5 rounded shadow-sm border border-rule">
                      Core Strategy
                    </span>
                  </div>
                  <p className="text-[11px] text-slate leading-relaxed">
                    {team.analysis.readiness_summary || team.analysis.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                   <div className="p-3 bg-tealLight/20 border border-teal/10 rounded-lg">
                    <div className="text-[9px] font-bold text-teal uppercase mb-1">Key Strengths</div>
                    <p className="text-[10px] text-slate italic leading-normal">
                      {team.analysis.strengths || team.strengths || 'No strengths noted.'}
                    </p>
                  </div>
                  <div className="p-3 bg-coralLight/20 border border-coral/10 rounded-lg">
                    <div className="text-[9px] font-bold text-coral uppercase mb-1">Critical Gaps</div>
                    <p className="text-[10px] text-slate italic leading-normal">
                      {team.analysis.gaps || team.gaps || 'No gaps noted.'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 opacity-40">
                <div className="w-12 h-12 bg-smoke rounded-full flex items-center justify-center mb-2">
                  <Sparkles size={24} className="text-silver" />
                </div>
                <h4 className="text-[10px] font-bold text-navy uppercase">Static Preview</h4>
                <p className="text-[10px] text-silver leading-relaxed">
                  Run a diagnostic analysis to generate AI-powered insights, SWOT, and module recommendations.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4 py-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-2 opacity-50">
                <div className="h-3 bg-smoke animate-pulse rounded w-1/4"></div>
                <div className="h-16 bg-smoke animate-pulse rounded w-full"></div>
              </div>
            ))}
            <div className="text-center py-4">
              <span className="text-[9px] font-bold text-silver animate-bounce inline-block">Querying Fallback Model Chain...</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 px-4 border-t border-rule bg-smoke/30 text-[9px] text-silver flex justify-between items-center shrink-0">
        <div className="flex items-center gap-1.5 font-medium">
          <div className={`w-1.5 h-1.5 rounded-full ${team.analysis ? 'bg-teal' : 'bg-silver'}`}></div>
          {team.analysis ? 'Last synced: Just now' : 'Ready to analyze'}
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-white px-1.5 py-0.5 rounded border border-rule uppercase tracking-tight font-bold text-[8px]">
            {team.analysis?.model_used || team.analysis?.model || 'Auto-Scale'}
          </span>
        </div>
      </div>
    </div>
  )
}
