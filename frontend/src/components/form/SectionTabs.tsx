import React from 'react'
import { useUIStore } from '../../store/uiStore'

export const TABS = [
  { id: 'details', label: '1. BASIC INFO', color: 'bg-gold' },
  { id: 'problem', label: '2. PROBLEM & SOL', color: 'bg-teal' },
  { id: 'market', label: '3. MARKET & VALID', color: 'bg-navyLight' },
  { id: 'biz', label: '4. BIZ MODEL', color: 'bg-purple' },
  { id: 'readiness', label: '5. READINESS', color: 'bg-gold' },
  { id: 'pitch', label: '6. PITCH READY', color: 'bg-coral' },
  { id: 'roadmap', label: '7. DIAGNOSIS', color: 'bg-navy' },
]

export default function SectionTabs() {
  const { activeTab, setActiveTab } = useUIStore()

  return (
    <div className="flex gap-1 overflow-x-auto scrollbar-hide">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as any)}
          className={`flex-1 min-w-[110px] text-left group pb-3 border-b-2 transition-all duration-300 ${
            activeTab === tab.id 
              ? 'border-gold pointer-events-none' 
              : 'border-transparent hover:border-silver'
          }`}
        >
          <div className={`w-1.5 h-1.5 rounded-full mb-2 transition-transform duration-300 ${
            tab.color
          } ${activeTab === tab.id ? 'scale-150 shadow-[0_0_8px_rgba(232,160,32,0.5)]' : 'opacity-40'}`}></div>
          <div className={`text-[9px] font-black tracking-tight ${
            activeTab === tab.id ? 'text-navy' : 'text-silver group-hover:text-slate'
          }`}>
            {tab.label}
          </div>
        </button>
      ))}
    </div>
  )
}
