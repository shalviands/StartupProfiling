import React from 'react'
import { useTeamStore } from '../../store/teamStore'

export default function LivePreview() {
  const { teams, activeTeamId } = useTeamStore()
  const team = teams.find(t => t.id === activeTeamId)

  if (!team) return null

  const sv = (v: any) => v || '—'
  
  // Simplified score retrieval using direct diagnostic columns
  const scores = {
    problem: team.problemScore || '—',
    market: team.customerInterviewScore || '—',
    bizModel: team.revenueModelScore || '—',
    pitch: team.pitchDeckScore || '—',
    overall: team.trl ? Math.round((Number(team.trl) + Number(team.brl || 0) + Number(team.crl || 0)) / 3 * 10) / 10 : '—'
  }

  const tiles = [
    { label: 'Problem', color: 'bg-teal', bg: 'bg-tealLight', val: scores.problem },
    { label: 'Market', color: 'bg-navy', bg: 'bg-silver/20', val: scores.market },
    { label: 'Business', color: 'bg-purple', bg: 'bg-purpleLight', val: scores.bizModel },
    { label: 'Pitch', color: 'bg-coral', bg: 'bg-coralLight', val: scores.pitch },
    { label: 'Readiness', color: 'bg-gold', bg: 'bg-gold', isLast: true, val: scores.overall },
  ]

  // Consolidate roadmap items for display
  const roadmapItems = [
    ...(team.p0 ? [{ priority: 'P0', action: team.p0, color: 'text-coral', bg: 'bg-coralLight' }] : []),
    ...(team.p1 ? [{ priority: 'P1', action: team.p1, color: 'text-gold', bg: 'bg-goldLight' }] : []),
    ...(team.p2 ? [{ priority: 'P2', action: team.p2, color: 'text-teal', bg: 'bg-tealLight' }] : []),
    ...(team.roadmap || []).map((ri: any) => ({
       priority: ri.priority,
       action: ri.action,
       color: ri.priority === 'P0' ? 'text-coral' : ri.priority === 'P1' ? 'text-gold' : 'text-teal',
       bg: ri.priority === 'P0' ? 'bg-coralLight' : ri.priority === 'P1' ? 'bg-goldLight' : 'bg-tealLight'
    }))
  ].slice(0, 4) // Show top 4 items in preview

  return (
    <div className="bg-white shadow-2xl w-full aspect-[1/1.414] origin-top scale-[0.8] p-4 text-[8px] flex flex-col gap-2 relative overflow-hidden border border-rule">
      {/* Header */}
      <div className="bg-navy p-3 -m-4 mb-2 relative h-16">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold"></div>
        <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gold"></div>
        <div className="text-gold font-bold scale-75 origin-left">STARTUP DIAGNOSIS / PROFILE REPORT</div>
        <div className="flex justify-between items-end mt-1">
          <div>
            <div className="text-white text-base font-bold leading-none">{sv(team.startupName)}</div>
            <div className="text-white/40 text-[6px]">Diagnosis & Profile Report</div>
          </div>
          <div className="text-right text-white/60 scale-75 origin-right">
            <div>TEAM: {sv(team.teamName)}</div>
            <div>SECTOR: {sv(team.sector)}</div>
          </div>
        </div>
      </div>

      {/* Score Tiles */}
      <div className="flex gap-1 h-10 mt-4">
        {tiles.map((tile, i) => (
          <div key={i} className={`flex-1 rounded-sm ${tile.bg} relative flex flex-col items-center justify-center pt-1`}>
            <div className={`absolute top-0 left-0 right-0 h-0.5 ${tile.color}`}></div>
            <div className={`font-bold text-[10px] ${tile.isLast ? 'text-white' : ''}`}>
              {tile.val}{typeof tile.val === 'number' ? '/5' : ''}
            </div>
            <div className={`text-[5px] ${tile.isLast ? 'text-white/80' : 'text-silver'}`}>{tile.label}</div>
          </div>
        ))}
      </div>

      {/* Body Columns */}
      <div className="flex gap-4 mt-2 flex-1 overflow-hidden">
        <div className="flex-[0.47] flex flex-col gap-2">
          <div className="text-[6px] font-bold text-navy border-b border-rule pb-0.5 uppercase">Diagnosis Findings</div>
          {[
            { label: 'STRENGTHS', bg: 'bg-tealLight/30', acc: 'bg-teal', val: team.strengths },
            { label: 'GAPS', bg: 'bg-coralLight/30', acc: 'bg-coral', val: team.gaps },
            { label: 'MODULES', bg: 'bg-purpleLight/30', acc: 'bg-purple', val: team.modules },
          ].map((card, i) => (
            <div key={i} className={`${card.bg} rounded-sm overflow-hidden border border-navy/5`}>
              <div className={`h-3 flex items-center px-1 border-l-2 ${card.acc}`}>
                <span className="font-bold text-navy/80 scale-75 origin-left">{card.label}</span>
              </div>
              <div className="p-1 min-h-[22px] text-[5px] leading-tight opacity-70 italic">
                {sv(card.val)}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex-[0.5] flex flex-col gap-2">
          <div className="text-[6px] font-bold text-navy border-b border-rule pb-0.5">TEAM DETAILS</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-[4px] text-silver font-bold">INSTITUTION</div>
              <div className="text-[6px] border-b border-rule pb-0.1">{sv(team.institution)}</div>
            </div>
            <div>
              <div className="text-[4px] text-silver font-bold">SIZE/STAGE</div>
              <div className="text-[6px] border-b border-rule pb-0.1">{sv(team.revenueStage)}</div>
            </div>
          </div>

          <div className="text-[6px] font-bold text-navy border-b border-rule pb-0.5 mt-1">E. ROADMAP</div>
          {roadmapItems.length > 0 ? (
            <div className="space-y-1">
              {roadmapItems.map((item, i) => (
                <div key={i} className={`${item.bg} p-1 flex items-center gap-2 rounded-[1px] border-b border-white/50`}>
                  <div className={`w-3 font-bold ${item.color}`}>{item.priority}</div>
                  <div className="flex-1 text-[5px] truncate">{item.action}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-silver italic text-[4px] border border-dashed border-rule rounded-sm mt-1">
              Add goals to view roadmap items
            </div>
          )}
        </div>
      </div>

      <div className="bg-navy p-2 -m-4 mt-auto flex justify-between items-center text-white/40">
        <div className="scale-75 origin-left font-bold uppercase tracking-widest">InUnity Private Limited</div>
        <div className="scale-75 origin-right">Confidential | Page 1 of 1</div>
      </div>
    </div>
  )
}
