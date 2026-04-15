import React from 'react'

interface ScoreDotsProps {
  value: number
  onChange: (val: number) => void
  label?: string
  color?: 'gold' | 'teal' | 'navy' | 'purple' | 'coral'
}

const COLOR_MAP = {
  gold: 'bg-gold border-gold shadow-gold/20',
  teal: 'bg-teal border-teal shadow-teal/20',
  navy: 'bg-navy border-navy shadow-navy/20',
  purple: 'bg-purple border-purple shadow-purple/20',
  coral: 'bg-coral border-coral shadow-coral/20',
}

export default function ScoreDots({ value, onChange, label, color = 'gold' }: ScoreDotsProps) {
  const activeClasses = COLOR_MAP[color] || COLOR_MAP.gold

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-[10px] font-bold text-silver uppercase tracking-wider">{label}</label>}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((dot) => (
          <button
            key={dot}
            type="button"
            onClick={() => onChange(dot)}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all border-2 ${
              value >= dot
                ? `${activeClasses} text-white shadow-md`
                : 'bg-white border-rule text-silver hover:border-silver'
            }`}
          >
            {dot}
          </button>
        ))}
      </div>
    </div>
  )
}
