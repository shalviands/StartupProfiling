import React from 'react'
import Sidebar from '../components/layout/Sidebar'
import TopBar from '../components/layout/TopBar'
import { useUIStore } from '../store/uiStore'
import { useTeamStore } from '../store/teamStore'
import { useTeams } from '../hooks/useTeams'
import { FileText } from 'lucide-react'
import SectionTabs, { TABS } from '../components/form/SectionTabs'
import FormSection from '../components/form/FormSection'
import LivePreview from '../components/preview/LivePreview'
import AIPanel from '../components/ai/AIPanel'

export default function Profiler() {
  const { activeTab, setActiveTab, previewVisible, isSaving } = useUIStore()
  const { activeTeamId } = useTeamStore()
  
  // React Query hook for teams (placeholder for now)
  // const { data: teams, isLoading } = useTeams()

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-smoke">
      <TopBar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 flex flex-col min-w-0 bg-white shadow-sm overflow-hidden m-4 rounded-xl border border-rule">
          {!activeTeamId ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-smoke rounded-full flex items-center justify-center mb-4 border border-rule">
                <FileText className="text-silver" size={32} />
              </div>
              <h2 className="text-navy font-bold mb-2">Select a Team</h2>
              <p className="text-silver text-sm max-w-xs">
                Choose a startup team from the sidebar to start diagnosing or create a new one.
              </p>
            </div>
          ) : (
            <>
              <div className="p-6 pb-0 border-b border-rule bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                <SectionTabs />
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                <FormSection />
              </div>
              
              <footer className="p-4 border-t border-rule flex justify-between items-center bg-smoke/30 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isSaving ? 'bg-gold animate-pulse' : 'bg-teal'}`}></div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isSaving ? 'text-gold' : 'text-teal'}`}>
                    {isSaving ? 'Saving changes...' : 'All changes saved'}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      const idx = TABS.findIndex(t => t.id === activeTab)
                      if (idx > 0) setActiveTab(TABS[idx - 1].id)
                    }}
                    disabled={activeTab === TABS[0].id}
                    className="px-5 py-2 text-xs font-bold text-slate hover:bg-white rounded-md transition-all border border-rule disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous Section
                  </button>
                  <button 
                    onClick={() => {
                      const idx = TABS.findIndex(t => t.id === activeTab)
                      if (idx < TABS.length - 1) setActiveTab(TABS[idx + 1].id)
                    }}
                    disabled={activeTab === TABS[TABS.length - 1].id}
                    className="px-5 py-2 text-xs font-bold bg-navy text-white hover:bg-navyLight rounded-md transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Section
                  </button>
                </div>
              </footer>
            </>
          )}
        </main>

        {previewVisible && activeTeamId && (
          <aside className="w-[340px] border-l border-rule bg-white flex flex-col h-full overflow-hidden transition-all duration-300">
            <div className="p-4 border-b border-rule bg-smoke/50">
              <h3 className="text-xs font-bold text-navy flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                LIVE REPORT PREVIEW
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-silver/10 scrollbar-hide">
              <LivePreview />
            </div>

            <div className="h-[200px] border-t border-rule bg-white">
              <AIPanel />
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

