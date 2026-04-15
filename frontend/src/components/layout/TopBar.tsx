import { Download, LayoutDashboard, FileText, LogOut, Table, Loader2, AlertCircle } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useTeamStore } from '../../store/teamStore'
import { useUIStore } from '../../store/uiStore'
import { supabase } from '../../lib/supabase'
import PDFDocument from '../pdf/PDFDocument'
import { exportTeamToExcel } from '../../utils/exportExcel'
import { calculateScores } from '../../utils/scores'

export default function TopBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { teams, activeTeamId } = useTeamStore()
  const { previewVisible, setPreviewVisible, isSaving, toast } = useUIStore()
  
  const activeTeam = teams.find(t => t.id === activeTeamId)
  const isProfiler = location.pathname === '/profiler'
  const scores = activeTeam ? calculateScores(activeTeam) : null

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <header className="h-[56px] bg-navy border-b border-white/10 flex items-center justify-between px-4 z-10 shadow-lg shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-6 h-6 bg-gold rounded text-navy flex items-center justify-center font-black text-xs">IU</div>
          <div className="hidden sm:block">
            <h2 className="text-white text-sm font-bold tracking-tight">InUnity Startup Diagnosis</h2>
            <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest leading-tight">Private Limited</p>
          </div>
        </div>
        
        {activeTeam && isProfiler && (
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10 animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="flex items-center gap-2">
              <div className="px-2 py-0.5 bg-gold/20 border border-gold/30 rounded text-gold text-[10px] font-bold uppercase">
                Active Team
              </div>
              <span className="text-white text-sm font-medium">{activeTeam.startupName}</span>
            </div>

            {/* Save Status */}
            <div className="flex items-center gap-2 min-w-[100px]">
              {isSaving ? (
                <div className="flex items-center gap-1.5 text-gold/60 text-[10px] font-bold uppercase animate-pulse">
                  <Loader2 size={10} className="animate-spin" />
                  Saving...
                </div>
              ) : toast?.type === 'error' ? (
                <div className="flex items-center gap-1.5 text-coral text-[10px] font-bold uppercase">
                  <AlertCircle size={10} />
                  Save Failed
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-white/20 text-[10px] font-bold uppercase">
                  <div className="w-1 h-1 rounded-full bg-teal" />
                  Synced
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-navyLight rounded-lg p-1 flex mr-3 border border-white/5">
          <button 
            onClick={() => navigate('/profiler')}
            className={`px-3 py-1 text-[10px] font-bold rounded transition-all flex items-center gap-1.5 ${
              isProfiler ? 'bg-white text-navy shadow-sm' : 'text-white/60 hover:text-white'
            }`}
          >
            <FileText size={12} />
            PROFILER
          </button>
          <button 
            onClick={() => navigate('/')}
            className={`px-3 py-1 text-[10px] font-bold rounded transition-all flex items-center gap-1.5 ${
              !isProfiler ? 'bg-white text-navy shadow-sm' : 'text-white/60 hover:text-white'
            }`}
          >
            <LayoutDashboard size={12} />
            DASHBOARD
          </button>
        </div>

        {isProfiler && activeTeam && (
          <>
            <button 
              onClick={() => setPreviewVisible(!previewVisible)}
              className={`h-9 px-4 rounded-md text-xs font-bold transition-all flex items-center gap-2 border ${
                previewVisible 
                  ? 'bg-gold border-gold text-navy shadow-[0_0_15px_rgba(232,160,32,0.3)]' 
                  : 'bg-navyLight border-white/10 text-white hover:bg-navyLight/80'
              }`}
            >
              {previewVisible ? 'Hide Preview' : 'Show Preview'}
            </button>

            <button 
              onClick={() => exportTeamToExcel(activeTeam)}
              className="h-9 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-green-900/20"
            >
              <Table size={14} />
              Download Excel
            </button>

            <PDFDownloadLink 
              document={<PDFDocument team={activeTeam} scores={scores!} />} 
              fileName={`${(activeTeam.startupName || 'Diagnosis').replace(/[^a-zA-Z0-9]/g, '_')}_Diagnosis_Report.pdf`}
            >
              {({ loading }) => (
                <button className={`h-9 px-4 bg-teal hover:bg-teal/90 text-white rounded-md text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-teal/20 ${loading ? 'opacity-50 cursor-wait' : ''}`}>
                  <Download size={14} />
                  {loading ? 'Generating...' : 'PDF Report'}
                </button>
              )}
            </PDFDownloadLink>
          </>
        )}
        
        <div className="group relative">
          <button 
            onClick={handleLogout}
            className="w-9 h-9 rounded-full bg-navyLight border border-white/10 flex items-center justify-center text-silver hover:bg-coral hover:text-white hover:border-coral transition-all ml-2"
          >
            <LogOut size={16} />
            <div className="absolute top-full right-0 mt-2 p-2 bg-navy border border-white/10 rounded-md text-[8px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl pointer-events-none">
              SIGN OUT
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
