import { useState } from 'react'
import api from '../lib/api'
import { useTeamStore } from '../store/teamStore'

export function useAIAnalysis() {
  const { activeTeamId, updateTeamLocally } = useTeamStore()
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyze = async () => {
    if (!activeTeamId) return null
    
    setIsAnalyzing(true)
    try {
      const { data } = await api.post(`/teams/${activeTeamId}/analyse`)
      updateTeamLocally(activeTeamId, {
        strengths: data.strengths,
        gaps: data.gaps
      })
      return data
    } catch (error) {
      console.error('AI Analysis failed:', error)
      return null
    } finally {
      setIsAnalyzing(false)
    }
  }

  return { analyze, isAnalyzing }
}
