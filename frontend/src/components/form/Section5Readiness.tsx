import React from 'react'
import type { TeamProfile } from '../../types/team.types'

interface Props {
  team: TeamProfile
  onChange: (field: keyof TeamProfile, value: string) => void
}

export default function Section5Readiness({ team, onChange }: Props) {
  const levels = [
    { key: 'trl', label: 'TRL (Technology)', color: 'bg-navy' },
    { key: 'brl', label: 'BRL (Business)', color: 'bg-gold' },
    { key: 'crl', label: 'CRL (Customer)', color: 'bg-teal' },
  ]

  const getInterpretation = (val: string) => {
    const v = parseInt(val)
    if (v <= 2) return "Ideation / Concept"
    if (v <= 4) return "Validation / Prototyping"
    if (v <= 6) return "Pilot / Production Prep"
    if (v <= 8) return "Market Ready / Scaling"
    return "Mature / Established"
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {levels.map((lvl) => (
        <div key={lvl.key} className="bg-white p-8 rounded-2xl border border-rule shadow-sm space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-sm font-black text-navy uppercase tracking-widest mb-1">{lvl.label}</h3>
              <p className="text-xs text-silver">Current maturity level: <span className="text-navy font-bold">Level {team[lvl.key as keyof TeamProfile]}</span></p>
            </div>
            <div className={`px-4 py-2 ${lvl.color} text-white text-xs font-black rounded-lg uppercase tracking-wider shadow-lg`}>
              {getInterpretation(team[lvl.key as keyof TeamProfile] as string)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-silver uppercase tracking-widest">Select Level</label>
              <select 
                value={team[lvl.key as keyof TeamProfile] as string}
                onChange={(e) => onChange(lvl.key as keyof TeamProfile, e.target.value)}
                className="w-full bg-smoke border border-rule rounded-xl h-14 px-5 text-lg font-black text-navy outline-none focus:ring-2 focus:ring-navy transition-all"
              >
                {[1,2,3,4,5,6,7,8,9].map(n => (
                  <option key={n} value={n}>Level {n}</option>
                ))}
              </select>
            </div>
            <div className="bg-smoke/50 p-5 rounded-xl border border-rule/50">
              <p className="text-[10px] uppercase font-bold text-silver tracking-tight mb-2">Stage Interpretation</p>
              <p className="text-sm text-navy font-medium leading-relaxed">
                {getInterpretation(team[lvl.key as keyof TeamProfile] as string)}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Scale Guide Box */}
      <div className="bg-navy p-8 rounded-2xl border border-gold/30 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <h4 className="text-gold font-black uppercase tracking-[0.2em] text-xs mb-4">Maturity Scale Guide (1–9)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-[10px] leading-relaxed">
          <div className="space-y-1">
            <span className="text-gold font-bold">1–3: IDEATION</span>
            <p className="text-silver">Concept formulated, basic research, and early design work.</p>
          </div>
          <div className="space-y-1">
            <span className="text-gold font-bold">4–6: VALIDATION</span>
            <p className="text-silver">Prototype built, simulated testing, and early pilot results.</p>
          </div>
          <div className="space-y-1">
            <span className="text-gold font-bold">7–9: DEPLOYMENT</span>
            <p className="text-silver">MVP launch, production scale, and sustained market operations.</p>
          </div>
        </div>
      </div>

    </div>
  )
}
