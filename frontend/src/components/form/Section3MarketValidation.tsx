import React from 'react'
import type { TeamProfile } from '../../types/team.types'
import ScoreDots from './ScoreDots'

interface Props {
  team: TeamProfile
  onScoreChange: (field: keyof TeamProfile, value: number) => void
  onChange: (field: keyof TeamProfile, value: any) => void
}

export default function Section3MarketValidation({ team, onScoreChange, onChange }: Props) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Validation Stats Block */}
      <div className="bg-[#EBF3FC] p-8 rounded-2xl border border-[#B8D4EE] shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#2B6CB0] uppercase tracking-wider">Users Tested With</label>
            <input 
              type="number" 
              value={team.usersTested}
              onChange={(e) => onChange('usersTested', e.target.value)}
              className="w-full bg-white border border-[#B8D4EE] rounded-xl h-12 px-4 text-navy font-bold focus:ring-2 focus:ring-[#2B6CB0] outline-none"
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#2B6CB0] uppercase tracking-wider">Stakeholder Interactions</label>
            <input 
              type="number" 
              value={team.stakeholdersInteracted}
              onChange={(e) => onChange('stakeholdersInteracted', e.target.value)}
              className="w-full bg-white border border-[#B8D4EE] rounded-xl h-12 px-4 text-navy font-bold focus:ring-2 focus:ring-[#2B6CB0] outline-none"
              placeholder="0"
            />
          </div>

          <div className="space-y-2 lg:col-span-2">
            <label className="text-[10px] font-bold text-[#2B6CB0] uppercase tracking-wider">Types of Stakeholders</label>
            <input 
              type="text" 
              value={team.stakeholderTypes}
              onChange={(e) => onChange('stakeholderTypes', e.target.value)}
              className="w-full bg-white border border-[#B8D4EE] rounded-xl h-12 px-4 shadow-sm outline-none focus:ring-2 focus:ring-[#2B6CB0]"
              placeholder="e.g., Farmers, Retailers, Govt Officials"
            />
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <label className="text-[10px] font-bold text-[#2B6CB0] uppercase tracking-wider">Testing & Interaction Details</label>
          <textarea 
            value={team.testingDetails}
            onChange={(e) => onChange('testingDetails', e.target.value)}
            className="w-full bg-white border border-[#B8D4EE] rounded-xl p-5 text-sm min-h-[100px] focus:ring-2 focus:ring-[#2B6CB0] outline-none shadow-inner"
            placeholder="Specific feedback, location of tests, and key observations from interactions..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-smoke/30 p-8 rounded-2xl border border-rule space-y-6">
          <ScoreDots 
            label="Customer Validation" 
            value={team.customerInterviewScore} 
            onChange={(v) => onScoreChange('customerInterviewScore', v)} 
            color="coral" 
          />
          <textarea 
            value={team.customerInterviewDetails}
            onChange={(e) => onChange('customerInterviewDetails', e.target.value)}
            className="w-full bg-white border border-rule rounded-xl p-5 text-sm text-navy min-h-[140px] focus:ring-2 focus:ring-coral outline-none shadow-inner"
            placeholder="Key insights from customer interviews. Pivot history?"
          />
        </div>

        <div className="bg-smoke/30 p-8 rounded-2xl border border-rule space-y-6">
          <ScoreDots 
            label="Competitor Awareness" 
            value={team.competitorScore} 
            onChange={(v) => onScoreChange('competitorScore', v)} 
            color="coral" 
          />
          <textarea 
            value={team.competitorDetails}
            onChange={(e) => onChange('competitorDetails', e.target.value)}
            className="w-full bg-white border border-rule rounded-xl p-5 text-sm text-navy min-h-[140px] focus:ring-2 focus:ring-coral outline-none shadow-inner"
            placeholder="Do they know their competitors? What is their edge?"
          />
        </div>
      </div>

      <div className="bg-smoke/30 p-8 rounded-2xl border border-rule space-y-6">
        <ScoreDots 
          label="Market Size (TAM/SAM/SOM)" 
          value={team.marketSizeScore} 
          onChange={(v) => onScoreChange('marketSizeScore', v)} 
          color="coral" 
        />
        <textarea 
          value={team.marketSizeDetails}
          onChange={(e) => onChange('marketSizeDetails', e.target.value)}
          className="w-full bg-white border border-rule rounded-xl p-5 text-sm text-navy min-h-[100px] focus:ring-2 focus:ring-coral outline-none shadow-inner"
          placeholder="Understanding of market scale and reachable audience."
        />
      </div>

    </div>
  )
}
