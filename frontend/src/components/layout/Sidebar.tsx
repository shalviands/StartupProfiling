import React from 'react'
import { Plus, Trash2, Search, Users } from 'lucide-react'
import { useTeamStore } from '../../store/teamStore'
import { useCreateTeam } from '../../hooks/useCreateTeam'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Loader2 } from 'lucide-react'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function Sidebar() {
  const { teams, activeTeamId, setActiveTeamId } = useTeamStore()
  const { createTeam, isCreating } = useCreateTeam()

  return (
    <aside className="w-[240px] bg-white border-r border-rule flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-rule">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gold rounded flex items-center justify-center text-white font-bold">IU</div>
          <h1 className="text-xs font-bold text-navy leading-tight">
            STARTUP DIAGNOSIS<br/>PROFILER
          </h1>
        </div>
        
        <button 
          onClick={createTeam}
          disabled={isCreating}
          className="w-full bg-gold hover:bg-gold/90 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50"
        >
          {isCreating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          {isCreating ? 'Creating...' : 'New Team'}
        </button>
      </div>

      <div className="p-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-silver" />
          <input 
            type="text" 
            placeholder="Search teams..." 
            className="w-full bg-smoke border border-rule rounded-md py-1.5 pl-8 pr-3 text-xs focus:ring-1 focus:ring-gold outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-2 space-y-1">
        {teams.length === 0 ? (
          <div className="p-4 text-center text-silver text-xs">
            No teams found.
          </div>
        ) : (
          teams.map(team => (
            <button
              key={team.id}
              onClick={() => setActiveTeamId(team.id)}
              className={cn(
                "w-full text-left p-3 rounded-md transition-all group relative",
                activeTeamId === team.id 
                  ? "bg-navy text-white" 
                  : "hover:bg-smoke text-slate"
              )}
            >
              <div className="font-bold text-xs truncate pr-6">{team.startupName || 'Untitled Startup'}</div>
              <div className={cn(
                "text-[10px] truncate",
                activeTeamId === team.id ? "text-silver" : "text-silver"
              )}>
                {team.teamName || 'N/A'} · {team.sector || 'N/A'}
              </div>
              
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Delete ${team.startupName}?`)) {
                    // Logic to delete from server and store
                    import('../../lib/api').then(api => {
                      api.default.delete(`/teams/${team.id}`).then(() => {
                        const { teams, setTeams, activeTeamId, setActiveTeamId } = useTeamStore.getState();
                        setTeams(teams.filter(t => t.id !== team.id));
                        if (activeTeamId === team.id) setActiveTeamId(null);
                      });
                    });
                  }
                }}
                className={cn(
                  "absolute top-2 right-2 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity",
                  activeTeamId === team.id ? "hover:bg-white/10" : "hover:bg-white"
                )}
              >
                <Trash2 size={12} className={activeTeamId === team.id ? "text-white" : "text-coral"} />
              </div>

              {activeTeamId === team.id && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gold rounded-r" />
              )}
            </button>
          ))
        )}
      </div>

      <div className="p-4 border-t border-rule bg-smoke/50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-silver/20 flex items-center justify-center">
            <Users size={12} className="text-slate" />
          </div>
          <div className="text-[10px] text-slate">
            <div className="font-bold">Programme Team</div>
            <div className="text-silver">Incubation Manager</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
