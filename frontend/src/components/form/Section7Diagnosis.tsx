import React from 'react'
import type { TeamProfile, RoadmapItem } from '../../types/team.types'
import { Plus, Trash2 } from 'lucide-react'

interface Props {
  team: TeamProfile
  onChange: (field: keyof TeamProfile, value: any) => void
}

export default function Section7Diagnosis({ team, onChange }: Props) {
  const roadmap = team.roadmap || []

  const updateRoadmap = (index: number, updates: Partial<RoadmapItem>) => {
    const newList = [...roadmap]
    newList[index] = { ...newList[index], ...updates }
    onChange('roadmap', newList)
  }

  const addRoadmapItem = () => {
    onChange('roadmap', [...roadmap, { priority: 'P1', action: '', supportFrom: '', byWhen: '' }])
  }

  const removeRoadmapItem = (index: number) => {
    onChange('roadmap', roadmap.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-silver uppercase tracking-widest px-1">Key Strengths</label>
          <textarea 
            value={team.strengths}
            onChange={(e) => onChange('strengths', e.target.value)}
            className="w-full bg-white border border-rule rounded-xl p-5 text-sm text-navy min-h-[120px] focus:ring-2 focus:ring-navy outline-none"
            placeholder="What is working well?"
          />
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-silver uppercase tracking-widest px-1">Critical Gaps</label>
          <textarea 
            value={team.gaps}
            onChange={(e) => onChange('gaps', e.target.value)}
            className="w-full bg-white border border-rule rounded-xl p-5 text-sm text-navy min-h-[120px] focus:ring-2 focus:ring-navy outline-none"
            placeholder="What needs immediate attention?"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-black text-navy uppercase tracking-widest">Individual Team Roadmap</h3>
          <button 
            onClick={addRoadmapItem}
            className="flex items-center gap-2 text-[10px] font-bold text-navy hover:text-gold transition-colors uppercase tracking-widest"
          >
            <Plus size={14} /> Add Milestone
          </button>
        </div>

        <div className="space-y-3">
          {roadmap.map((item, index) => (
            <div key={index} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
               <select 
                 value={item.priority}
                 onChange={(e) => updateRoadmap(index, { priority: e.target.value as any })}
                 className={`w-20 rounded-xl p-2.5 text-[10px] font-bold outline-none border border-rule ${
                   item.priority === 'P0' ? 'bg-coral/10 text-coral' : 
                   item.priority === 'P1' ? 'bg-gold/10 text-gold' : 'bg-teal/10 text-teal'
                 }`}
               >
                 <option value="P0">P0</option>
                 <option value="P1">P1</option>
                 <option value="P2">P2</option>
               </select>

               <input 
                 type="text" value={item.action}
                 onChange={(e) => updateRoadmap(index, { action: e.target.value })}
                 placeholder="Action Item / Milestone"
                 className="flex-1 bg-white border border-rule rounded-xl p-2.5 text-xs text-navy focus:ring-1 focus:ring-navy outline-none"
               />

               <input 
                 type="text" value={item.supportFrom}
                 onChange={(e) => updateRoadmap(index, { supportFrom: e.target.value })}
                 placeholder="Support From"
                 className="w-40 bg-white border border-rule rounded-xl p-2.5 text-xs text-navy focus:ring-1 focus:ring-navy outline-none hidden md:block"
               />

               <input 
                 type="text" value={item.byWhen}
                 onChange={(e) => updateRoadmap(index, { byWhen: e.target.value })}
                 placeholder="By When?"
                 className="w-32 bg-white border border-rule rounded-xl p-2.5 text-xs text-navy focus:ring-1 focus:ring-navy outline-none"
               />

               <button 
                 onClick={() => removeRoadmapItem(index)}
                 className="p-2 text-silver hover:text-coral transition-colors"
               >
                 <Trash2 size={16} />
               </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-rule">
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-silver uppercase tracking-widest px-1">Assigned Mentor</label>
          <input 
            type="text" value={team.mentor}
            onChange={(e) => onChange('mentor', e.target.value)}
            className="w-full bg-white border border-rule rounded-xl p-4 text-sm text-navy focus:ring-2 focus:ring-navy outline-none"
            placeholder="Primary Mentor"
          />
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-silver uppercase tracking-widest px-1">Next Check-in</label>
          <input 
            type="date" value={team.nextCheckin}
            onChange={(e) => onChange('nextCheckin', e.target.value)}
            className="w-full bg-white border border-rule rounded-xl p-4 text-sm text-navy focus:ring-2 focus:ring-navy outline-none"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <label className="text-[10px] font-bold text-silver uppercase tracking-widest px-1">Final Programme Notes</label>
        <textarea 
          value={team.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          className="w-full bg-white border border-rule rounded-xl p-5 text-sm text-navy min-h-[100px] focus:ring-2 focus:ring-navy outline-none"
          placeholder="Any other observations or critical notes..."
        />
      </div>

    </div>
  )
}
