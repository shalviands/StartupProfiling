import React from 'react'
import { useUIStore } from '../../store/uiStore'
import { useTeamStore } from '../../store/teamStore'

// Section Components
import Section1BasicInfo from './Section1BasicInfo'
import Section2ProblemSolution from './Section2ProblemSolution'
import Section3MarketValidation from './Section3MarketValidation'
import Section4BusinessModel from './Section4BusinessModel'
import Section5Readiness from './Section5Readiness'
import Section6Pitch from './Section6Pitch'
import Section7Diagnosis from './Section7Diagnosis'

export default function FormSection() {
  const { activeTab } = useUIStore()
  const { teams, activeTeamId, updateTeamLocally } = useTeamStore()
  
  const team = teams.find(t => t.id === activeTeamId)
  if (!team) return null

  const handleChange = (field: string, value: any) => {
    updateTeamLocally(team.id, { [field]: value })
  }

  const handleScoreChange = (fieldKey: string, score: number) => {
    handleChange(fieldKey, score)
  }

  const renderSection = () => {
    switch (activeTab) {
      case 'details':
        return <Section1BasicInfo team={team} onChange={handleChange} />
      case 'problem':
        return <Section2ProblemSolution team={team} onChange={handleChange} onScoreChange={handleScoreChange} />
      case 'market':
        return <Section3MarketValidation team={team} onChange={handleChange} onScoreChange={handleScoreChange} />
      case 'biz':
        return <Section4BusinessModel team={team} onChange={handleChange} onScoreChange={handleScoreChange} />
      case 'readiness':
        return <Section5Readiness team={team} onChange={handleChange} />
      case 'pitch':
        return <Section6Pitch team={team} onChange={handleChange} onScoreChange={handleScoreChange} />
      case 'roadmap':
        return <Section7Diagnosis team={team} onChange={handleChange} />
      default:
        return <Section1BasicInfo team={team} onChange={handleChange} />
    }
  }

  return (
    <div className="pb-20">
      {renderSection()}
    </div>
  )
}
