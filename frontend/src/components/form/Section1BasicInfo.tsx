import React from 'react'
import type { TeamProfile } from '../../types/team.types'

interface Props {
  team: TeamProfile
  onChange: (field: keyof TeamProfile, value: any) => void
}

export default function Section1BasicInfo({ team, onChange }: Props) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-silver uppercase tracking-widest px-1">Startup Name</label>
          <input 
            type="text" value={team.startupName}
            onChange={(e) => onChange('startupName', e.target.value)}
            className="w-full bg-white border border-rule rounded-xl p-4 text-sm text-navy focus:ring-2 focus:ring-gold outline-none shadow-inner"
            placeholder="e.g. AgriFlow Systems"
          />
        </div>
        
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-silver uppercase tracking-widest px-1">Team ID / Name</label>
          <input 
            type="text" value={team.teamName}
            onChange={(e) => onChange('teamName', e.target.value)}
            className="w-full bg-white border border-rule rounded-xl p-4 text-sm text-navy focus:ring-2 focus:ring-gold outline-none shadow-inner"
            placeholder="e.g. Batch 04 - Team A"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-silver uppercase tracking-widest px-1">Primary Sector</label>
          <select 
            value={team.sector}
            onChange={(e) => onChange('sector', e.target.value)}
            className="w-full bg-white border border-rule rounded-xl p-4 text-sm text-navy focus:ring-2 focus:ring-gold outline-none shadow-inner appearance-none"
          >
            <option value="">Select Sector...</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Healthcare">Healthcare</option>
            <option value="EdTech">EdTech</option>
            <option value="FinTech">FinTech</option>
            <option value="Sustainability">Sustainability</option>
            <option value="Hardware">Hardware</option>
            <option value="Other">Other (Please Specify)</option>
          </select>
          {team.sector === 'Other' && (
            <input 
              type="text" value={team.sectorOther || ''}
              onChange={(e) => onChange('sectorOther', e.target.value)}
              className="mt-2 w-full bg-white border border-rule rounded-xl p-4 text-sm text-navy focus:ring-2 focus:ring-gold outline-none shadow-inner animate-in zoom-in-95 duration-200"
              placeholder="Specify Sector..."
            />
          )}
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-bold text-silver uppercase tracking-widest px-1">Institution</label>
          <input 
            type="text" value={team.institution}
            onChange={(e) => onChange('institution', e.target.value)}
            className="w-full bg-white border border-rule rounded-xl p-4 text-sm text-navy focus:ring-2 focus:ring-gold outline-none shadow-inner"
            placeholder="e.g. NIT Karnataka"
          />
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-bold text-silver uppercase tracking-widest px-1">Team Size</label>
          <input 
            type="number" value={team.teamSize}
            onChange={(e) => onChange('teamSize', e.target.value)}
            className="w-full bg-white border border-rule rounded-xl p-4 text-sm text-navy focus:ring-2 focus:ring-gold outline-none shadow-inner"
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-bold text-silver uppercase tracking-widest px-1">Interview Date & Interviewer</label>
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="date" value={team.interviewDate}
            onChange={(e) => onChange('interviewDate', e.target.value)}
            className="w-full bg-white border border-rule rounded-xl p-4 text-sm text-navy focus:ring-2 focus:ring-gold outline-none shadow-inner"
          />
          <input 
            type="text" value={team.interviewer}
            onChange={(e) => onChange('interviewer', e.target.value)}
            className="w-full bg-white border border-rule rounded-xl p-4 text-sm text-navy focus:ring-2 focus:ring-gold outline-none shadow-inner"
            placeholder="Interviewer Name"
          />
        </div>
      </div>
    </div>
  )
}
