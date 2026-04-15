import React from 'react'
import type { TeamProfile } from '../../types/team.types'
import ScoreDots from './ScoreDots'

interface Props {
  team: TeamProfile
  onScoreChange: (field: keyof TeamProfile, value: number) => void
  onChange: (field: keyof TeamProfile, value: string) => void
}

export default function Section6Pitch({ team, onScoreChange, onChange }: Props) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-smoke/30 p-8 rounded-2xl border border-rule">
        <div className="space-y-10">
          <div className="space-y-4">
            <ScoreDots 
              label="Pitch Deck & Experience" 
              value={team.pitchDeckScore} 
              onChange={(v) => onScoreChange('pitchDeckScore', v)} 
              color="coral" 
            />
            <textarea 
              value={team.pitchDeckDetails}
              onChange={(e) => onChange('pitchDeckDetails', e.target.value)}
              className="w-full bg-white border border-rule rounded-xl p-5 text-sm min-h-[80px] focus:ring-2 focus:ring-coral outline-none shadow-inner"
              placeholder="Feedback on storytelling flow and visual clarity..."
            />
          </div>

          <div className="space-y-4">
            <ScoreDots 
              label="Elevator Pitch (60 sec)" 
              value={team.elevatorScore} 
              onChange={(v) => onScoreChange('elevatorScore', v)} 
              color="coral" 
            />
            <textarea 
              value={team.elevatorDetails}
              onChange={(e) => onChange('elevatorDetails', e.target.value)}
              className="w-full bg-white border border-rule rounded-xl p-5 text-sm min-h-[80px] focus:ring-2 focus:ring-coral outline-none shadow-inner"
              placeholder="Ability to explain the core value prop in under 60 seconds."
            />
          </div>

          <div className="space-y-4">
            <ScoreDots 
              label="Investor Ask Clarity" 
              value={team.investorAskScore} 
              onChange={(v) => onScoreChange('investorAskScore', v)} 
              color="coral" 
            />
            <textarea 
              value={team.investorAskDetails}
              onChange={(e) => onChange('investorAskDetails', e.target.value)}
              className="w-full bg-white border border-rule rounded-xl p-5 text-sm min-h-[80px] focus:ring-2 focus:ring-coral outline-none shadow-inner"
              placeholder="Specific funding, resource, or partnership needs."
            />
          </div>
        </div>
      </div>

    </div>
  )
}
