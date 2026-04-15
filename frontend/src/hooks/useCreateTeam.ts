import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
import { useTeamStore } from '../store/teamStore'
import { useUIStore } from '../store/uiStore'

export function useCreateTeam() {
  const navigate = useNavigate()
  const { addNewTeam } = useTeamStore()
  const { setActiveTab } = useUIStore()
  const [isCreating, setIsCreating] = useState(false)

  const createTeam = async () => {
    setIsCreating(true)
    try {
      // Create a basic empty team entry
      const { data } = await api.post('/teams', {
        startup_name: 'New Startup Profile',
        team_name: 'Untitled Team'
      })
      
      // Update local store (sets as active automatically via addNewTeam)
      addNewTeam(data)
      
      // Reset to first tab and navigate
      setActiveTab('basic-info')
      navigate('/profiler')
      
      return data
    } catch (error) {
      console.error('Failed to create team:', error)
      return null
    } finally {
      setIsCreating(false)
    }
  }

  return { createTeam, isCreating }
}
