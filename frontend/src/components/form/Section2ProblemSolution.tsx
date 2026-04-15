import React from 'react'
import type { TeamProfile } from '../../types/team.types'
import ScoreDots from './ScoreDots'

interface Props {
  team: TeamProfile
  onScoreChange: (field: keyof TeamProfile, value: number) => void
  onChange: (field: keyof TeamProfile, value: string) => void
}

export default function Section2ProblemSolution({ team, onScoreChange, onChange }: Props) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-smoke/30 p-8 rounded-2xl border border-rule space-y-6">
        <div className="flex justify-between items-center px-1">
          <ScoreDots 
            label="Problem Statement" 
            value={team.problemScore} 
            onChange={(v) => onScoreChange('problemScore', v)} 
            color="teal" 
          />
        </div>
        <textarea 
          value={team.problemStatement}
          onChange={(e) => onChange('problemStatement', e.target.value)}
          className="w-full bg-white border border-rule rounded-xl p-5 text-sm text-navy min-h-[120px] focus:ring-2 focus:ring-teal outline-none shadow-inner"
          placeholder="What specific pain point are they solving? How well is it articulated?"
        />
      </div>

      <div className="bg-smoke/30 p-8 rounded-2xl border border-rule space-y-6">
        <div className="flex justify-between items-center px-1">
          <ScoreDots 
            label="Proposed Solution" 
            value={team.solutionScore} 
            onChange={(v) => onScoreChange('solutionScore', v)} 
            color="teal" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-silver uppercase tracking-widest px-1">Product Type</label>
            <select 
              value={team.productType}
              onChange={(e) => onChange('productType', e.target.value)}
              className="w-full bg-white border border-rule rounded-xl p-4 text-sm text-navy focus:ring-2 focus:ring-teal outline-none"
            >
              <option value="">Select Category...</option>
              <option value="SaaS / Software">SaaS / Software</option>
              <option value="Physical Hardware">Physical Hardware</option>
              <option value="Software + Hardware">Software + Hardware</option>
              <option value="Service Marketplace">Service Marketplace</option>
              <option value="Platform">Platform</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {team.productType === 'Other' && (
            <div className="space-y-2 animate-in zoom-in-95 duration-200">
              <label className="text-[10px] font-bold text-silver uppercase tracking-widest px-1">Specify Type</label>
              <input 
                type="text" value={team.productTypeOther}
                onChange={(e) => onChange('productTypeOther', e.target.value)}
                className="w-full bg-white border border-rule rounded-xl p-4 text-sm text-navy focus:ring-2 focus:ring-teal outline-none"
                placeholder="e.g. Deeptech AI"
              />
            </div>
          )}
        </div>

        <textarea 
          value={team.solutionDescription}
          onChange={(e) => onChange('solutionDescription', e.target.value)}
          className="w-full bg-white border border-rule rounded-xl p-5 text-sm text-navy min-h-[120px] focus:ring-2 focus:ring-teal outline-none shadow-inner"
          placeholder="How does the product solve the problem? Is there a working prototype?"
        />
      </div>

      <div className="bg-smoke/30 p-8 rounded-2xl border border-rule space-y-6">
        <ScoreDots 
          label="Unique Value Proposition (UVP)" 
          value={team.uniqueValueScore} 
          onChange={(v) => onScoreChange('uniqueValueScore', v)} 
          color="teal" 
        />
        <textarea 
          value={team.uniqueValue}
          onChange={(e) => onChange('uniqueValue', e.target.value)}
          className="w-full bg-white border border-rule rounded-xl p-5 text-sm text-navy min-h-[100px] focus:ring-2 focus:ring-teal outline-none shadow-inner"
          placeholder="What makes them different? Is there a clear 'secret sauce'?"
        />
      </div>

    </div>
  )
}
