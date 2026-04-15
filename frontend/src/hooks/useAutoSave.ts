import { useEffect, useRef } from 'react'
import { useTeamStore } from '../store/teamStore'
import { useUIStore } from '../store/uiStore'
import api from '../lib/api'

export function useAutoSave() {
  const { teams, activeTeamId } = useTeamStore()
  const { setIsSaving } = useUIStore()
  const timerRef = useRef<any>(null)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (!activeTeamId) return

    const activeTeam = teams.find(t => t.id === activeTeamId)
    if (!activeTeam) return

    // Clear existing timer
    if (timerRef.current) clearTimeout(timerRef.current)

    // Set new debounce timer
    setIsSaving(true)
    timerRef.current = setTimeout(async () => {
      try {
        await api.put(`/teams/${activeTeamId}`, activeTeam)
      } catch (error) {
        console.error('Auto-save failed:', error)
      } finally {
        setIsSaving(false)
      }
    }, 600)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [teams, activeTeamId, setIsSaving])
}
