import { create } from 'zustand'
import type { TeamProfile } from '../types/team.types'

interface TeamState {
  activeTeamId: string | null
  teams: TeamProfile[]
  setTeams: (teams: TeamProfile[]) => void
  setActiveTeamId: (id: string | null) => void
  updateTeamLocally: (id: string, updates: Partial<TeamProfile>) => void
  addNewTeam: (team: TeamProfile) => void
}

export const useTeamStore = create<TeamState>((set) => ({
  activeTeamId: null,
  teams: [],
  setTeams: (teams) => set({ teams }),
  setActiveTeamId: (id) => set({ activeTeamId: id }),
  addNewTeam: (team) => set((state) => ({ 
    teams: [team, ...state.teams],
    activeTeamId: team.id 
  })),
  updateTeamLocally: (id, updates) => set((state) => ({
    teams: state.teams.map(t => t.id === id ? { ...t, ...updates } : t)
  }))
}))
