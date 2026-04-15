import React from 'react'
import type { TeamProfile } from '../../types/team.types'
import ScoreDots from './ScoreDots'

interface Props {
  team: TeamProfile
  onScoreChange: (field: keyof TeamProfile, value: number) => void
  onChange: (field: keyof TeamProfile, value: string) => void
}

export default function Section4BusinessModel({ team, onScoreChange, onChange }: Props) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-smoke/30 p-8 rounded-2xl border border-rule space-y-6">
        <div className="flex justify-between items-center px-1">
          <ScoreDots 
            label="Revenue Model" 
            value={team.revenueModelScore} 
            onChange={(v) => onScoreChange('revenueModelScore', v)} 
            color="purple" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-silver uppercase tracking-widest px-1">Revenue Stage</label>
            <select 
              value={team.revenueStage}
              onChange={(e) => onChange('revenueStage', e.target.value)}
              className="w-full bg-white border border-rule rounded-xl p-4 text-sm text-navy focus:ring-2 focus:ring-purple outline-none shadow-sm"
            >
              <option value="">Select...</option>
              <option value="Idea">Idea</option>
              <option value="Pre-Revenue MVP">Pre-Revenue MVP</option>
              <option value="Early Revenue">Early Revenue</option>
              <option value="Scaling">Scaling</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-silver uppercase tracking-widest px-1">Primary Model</label>
            <select 
              value={team.businessModelType}
              onChange={(e) => onChange('businessModelType', e.target.value)}
              className="w-full bg-white border border-rule rounded-xl p-4 text-sm text-navy focus:ring-2 focus:ring-purple outline-none shadow-sm"
            >
              <option value="">Select...</option>
              <option value="Direct Sales">Direct Sales</option>
              <option value="Subscription">Subscription</option>
              <option value="Marketplace">Marketplace</option>
              <option value="Commission">Commission</option>
              <option value="Ad-based">Ad-based</option>
              <option value="Freemium">Freemium</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <textarea 
          value={team.revenueModelDetails}
          onChange={(e) => onChange('revenueModelDetails', e.target.value)}
          className="w-full bg-white border border-rule rounded-xl p-5 text-sm text-navy min-h-[100px] focus:ring-2 focus:ring-purple outline-none shadow-inner"
          placeholder="How exactly will they make money? Pricing assumptions?"
        />
      </div>

      <div className="bg-smoke/30 p-8 rounded-2xl border border-rule space-y-6">
        <div className="flex justify-between items-center px-1">
          <ScoreDots 
            label="Business Model Canvas (BMC)" 
            value={team.bmcScore} 
            onChange={(v) => onScoreChange('bmcScore', v)} 
            color="purple" 
          />
          <div className="flex items-center gap-3">
            <label className="text-[10px] font-bold text-silver uppercase tracking-widest">BMC Done?</label>
            <select 
              value={team.bmcDone}
              onChange={(e) => onChange('bmcDone', e.target.value)}
              className="bg-white border border-rule rounded-lg px-3 py-1.5 text-xs font-bold text-navy outline-none"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Draft Complete">Draft Complete</option>
              <option value="Finalized">Finalized</option>
            </select>
          </div>
        </div>

        <textarea 
          value={team.bmcDetails}
          onChange={(e) => onChange('bmcDetails', e.target.value)}
          className="w-full bg-white border border-rule rounded-xl p-5 text-sm text-navy min-h-[120px] focus:ring-2 focus:ring-purple outline-none shadow-inner"
          placeholder="Overall BMC coherence and critical resource identification."
        />
      </div>

    </div>
  )
}
