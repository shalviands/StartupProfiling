import { useNavigate } from 'react-router-dom'
import { useTeams } from '../hooks/useTeams'
import { useCreateTeam } from '../hooks/useCreateTeam'
import { useTeamStore } from '../store/teamStore'
import { calculateScores, scoreColor, scoreBg } from '../utils/scores'
import type { TeamProfile } from '../types/team.types'
import TopBar from '../components/layout/TopBar'
import { Plus, ChevronRight, Loader2 } from 'lucide-react'

// ── Status derivation ──────────────────────────────────────────────
function deriveStatus(team: TeamProfile): string {
  const s = calculateScores(team)

  // Finalized: has overall score AND has diagnosis filled
  // AND has at least one P0 need AND has mentor assigned
  const isFinalized =
    s.overall !== null &&
    !!team.strengths?.trim() &&
    !!team.gaps?.trim() &&
    !!team.p0?.trim() &&
    !!team.mentor?.trim()

  // Completed: all 4 section scores exist (fully profiled)
  const isCompleted =
    s.problem !== null &&
    s.market  !== null &&
    s.biz     !== null &&
    s.pitch   !== null

  // In Progress: at least one score exists
  const isInProgress =
    s.problem !== null ||
    s.market  !== null ||
    s.biz     !== null ||
    s.pitch   !== null

  if (isFinalized)   return 'finalized'
  if (isCompleted)   return 'completed'
  if (isInProgress)  return 'in_progress'
  return 'new'
}

// ── Dashboard component ────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate()
  const { setActiveTeamId } = useTeamStore()
  const { createTeam, isCreating } = useCreateTeam()
  const { data: teams = [], isLoading, error } = useTeams()

  const stats = {
    total:       teams.length,
    inProgress:  teams.filter(t => calculateScores(t).overall === null).length,
    completed:   teams.filter(t => calculateScores(t).overall !== null).length,
    finalized:   teams.filter(t => deriveStatus(t) === 'finalized').length,
  }

  // ── Loading state ──────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-smoke">
        <TopBar />
        <div className="p-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 rounded-xl bg-white border border-rule animate-pulse" />
            ))}
          </div>
          <div className="h-96 rounded-xl bg-white border border-rule animate-pulse" />
        </div>
      </div>
    )
  }

  // ── Error state ────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col h-screen bg-smoke">
        <TopBar />
        <div className="p-8 max-w-7xl mx-auto w-full">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">
            <h2 className="font-bold mb-2">Failed to load dashboard data</h2>
            <p className="text-sm">{String(error)}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Empty state ────────────────────────────────────────────────
  if (teams.length === 0) {
    return (
      <div className="flex flex-col h-screen bg-smoke">
        <TopBar />
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl font-bold text-navy mb-2">No startup profiles yet</h2>
          <p className="text-sm max-w-xs text-center">
            Once you add teams in the Profiler, their diagnostic summaries will appear here.
          </p>
        </div>
      </div>
    )
  }

  // ── Stat card definitions ──────────────────────────────────────
  const statCards = [
    {
      label:  'Teams',
      value:  stats.total,
      bg:     '#0F2647',
      text:   '#FFFFFF',
      sub:    'total profiles',
    },
    {
      label:  'In Progress',
      value:  stats.inProgress,
      bg:     '#FDF3DC',
      text:   '#E8A020',
      sub:    'being profiled',
    },
    {
      label:  'Completed',
      value:  stats.completed,
      bg:     '#D8F0ED',
      text:   '#1A7A6E',
      sub:    'fully scored',
    },
    {
      label:  'Finalized',
      value:  stats.finalized,
      bg:     '#EEEAFF',
      text:   '#5B4FCF',
      sub:    'diagnosis done',
    },
  ]

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen bg-smoke">
      <TopBar />

      <main className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full">
        {/* Page title & Actions */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-black text-navy tracking-tight">Diagnostic Dashboard</h1>
            <p className="text-silver text-sm mt-1">
              Real-time overview of {stats.total} incubated startup profiles.
            </p>
          </div>
          
          <button 
            onClick={createTeam}
            disabled={isCreating}
            className="bg-navy text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-navyLight transition-all shadow-lg shadow-navy/20 flex items-center gap-2 group disabled:opacity-50"
          >
            {isCreating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} className="group-hover:rotate-90 transition-transform" />}
            {isCreating ? 'Creating Profile...' : 'New Creation'}
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {statCards.map(card => (
            <div
              key={card.label}
              className="rounded-2xl p-6 flex flex-col gap-1 shadow-sm border border-black/5"
              style={{ background: card.bg }}
            >
              <span
                className="text-4xl font-black leading-none mb-1"
                style={{ color: card.text }}
              >
                {card.value}
              </span>
              <span
                className="text-sm font-bold uppercase tracking-wider"
                style={{ color: card.text }}
              >
                {card.label}
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: card.text, opacity: 0.6 }}
              >
                {card.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Teams table */}
        <div className="bg-white rounded-2xl border border-rule shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-rule flex items-center justify-between bg-smoke/20">
            <h2 className="text-sm font-black text-navy uppercase tracking-widest">Team Performance Summary</h2>
            <span className="text-[10px] font-bold text-silver bg-smoke px-2 py-1 rounded tracking-widest uppercase">
              {teams.length} Profiles Synced
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-smoke/30 text-[10px] text-silver font-black uppercase tracking-widest border-b border-rule">
                  <th className="px-6 py-4 text-left">Startup / Team</th>
                  <th className="px-6 py-4 text-center">Problem</th>
                  <th className="px-6 py-4 text-center">Market</th>
                  <th className="px-6 py-4 text-center">Biz Model</th>
                  <th className="px-6 py-4 text-center">Pitch</th>
                  <th className="px-6 py-4 text-center">Overall</th>
                  <th className="px-6 py-4 text-center">TRL</th>
                  <th className="px-6 py-4 text-center">P0 Need</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-1 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {teams.map((team, i) => {
                  const s      = calculateScores(team)
                  const status = deriveStatus(team)

                  const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
                    finalized:   { bg: '#EEEAFF', text: '#5B4FCF', label: 'Finalized'   },
                    completed:   { bg: '#D8F0ED', text: '#1A7A6E', label: 'Completed'   },
                    in_progress: { bg: '#FDF3DC', text: '#E8A020', label: 'In Progress' },
                    new:         { bg: '#F4F6F9', text: '#8A9BB0', label: 'New'         },
                  }
                  const ss = statusStyles[status] ?? statusStyles.new

                  const ScoreCell = ({ value }: { value: number | null }) => {
                    const bgColor = scoreBg(value)
                    const textColor = scoreColor(value)
                    return (
                      <td className="px-6 py-4 text-center">
                        <span
                          className="inline-block px-2.5 py-1 rounded-md text-[10px] font-black w-8"
                          style={{ background: bgColor, color: textColor }}
                        >
                          {value ?? '—'}
                        </span>
                      </td>
                    )
                  }

                  return (
                    <tr
                      key={team.id}
                      onClick={() => {
                        setActiveTeamId(team.id)
                        navigate('/profiler')
                      }}
                      className={`hover:bg-smoke/80 transition-all cursor-pointer group/row ${i % 2 === 0 ? '' : 'bg-smoke/10'}`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-navy group-hover/row:text-teal transition-colors">
                          {team.startupName || 'Unnamed Startup'}
                        </div>
                        <div className="text-[10px] text-silver font-medium">{team.teamName || 'N/A'} • {team.sector || 'N/A'}</div>
                      </td>
                      <ScoreCell value={s.problem} />
                      <ScoreCell value={s.market}  />
                      <ScoreCell value={s.biz}     />
                      <ScoreCell value={s.pitch}   />
                      <td className="px-6 py-4 text-center">
                        <span
                          className="inline-block px-3 py-1.5 rounded-lg text-xs font-black"
                          style={{
                            background: scoreBg(s.overall),
                            color:      scoreColor(s.overall),
                          }}
                        >
                          {s.overall ?? '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-xs font-black text-navy">
                        {team.trl || '—'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight"
                          style={{ background: ss.bg, color: ss.text }}
                        >
                          {ss.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <ChevronRight size={14} className="text-silver opacity-0 group-hover/row:opacity-100 group-hover/row:translate-x-1 transition-all" />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
