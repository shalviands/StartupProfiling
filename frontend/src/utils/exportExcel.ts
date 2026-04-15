import XLSX from 'xlsx-js-style'
import type { TeamProfile, TeamScores } from '../types/team.types'
import { calculateScores, scoreColor, scoreBg, scoreLabel } from './scores'

export function exportTeamToExcel(team: TeamProfile): void {
  const scores = calculateScores(team)
  const workbook = XLSX.utils.book_new()
  
  // Sheet 1: Team Profile
  const sheet1Data = buildTeamProfileData(team, scores)
  const sheet1Rows = sheet1Data.data
  const sheet1 = XLSX.utils.aoa_to_sheet(sheet1Rows)
  
  sheet1['!cols'] = [{ wch: 34 }, { wch: 52 }, { wch: 16 }, { wch: 22 }]
  sheet1['!merges'] = sheet1Data.merges
  applyStyles(sheet1, sheet1Data.styles)

  // Sheet 2: Score Summary
  const sheet2Data = buildScoreSummaryData(team, scores)
  const sheet2Rows = sheet2Data.data
  const sheet2 = XLSX.utils.aoa_to_sheet(sheet2Rows)
  
  sheet2['!cols'] = [{ wch: 30 }, { wch: 16 }, { wch: 24 }]
  sheet2['!merges'] = sheet2Data.merges
  applyStyles(sheet2, sheet2Data.styles)

  XLSX.utils.book_append_sheet(workbook, sheet1, "Team Profile")
  XLSX.utils.book_append_sheet(workbook, sheet2, "Score Summary")

  const fileName = `${(team.startupName || team.teamName || 'Team').replace(/[^a-zA-Z0-9]/g, '_')}_Diagnosis_Data.xlsx`
  XLSX.writeFile(workbook, fileName)
}

function interpretTRL(val: any): string {
  const v = String(val || '')
  switch (v) {
    case '1': return "Idea only"
    case '2': return "Early Concept"
    case '3': return "Design Stage"
    case '4': return "Design Complete"
    case '5': return "Prototype Built"
    case '6': return "Pilot Tested"
    case '7': return "MVP Built"
    case '8': return "Early Revenue"
    case '9': return "Deployed & Scaled"
    default: return "—"
  }
}

function buildTeamProfileData(team: TeamProfile, scores: TeamScores) {
  const rows: any[] = []
  const merges: any[] = []
  const styles: any = {}
  let r = 0

  const addHeader = (text: string, bgColor = '#0F2647', textColor = '#E8A020', fontSize = 12) => {
    rows.push([text, '', '', ''])
    merges.push({ s: { r, c: 0 }, e: { r, c: 3 } })
    styles[`${r},0`] = {
      fill: { fgColor: { rgb: bgColor.replace('#','') } },
      font: { color: { rgb: textColor.replace('#','') }, bold: true, sz: fontSize },
      alignment: { vertical: 'center', horizontal: 'left' }
    }
    r++
  }

  const addSubHeader = (labels: string[], bgColor = '#0F2647') => {
    rows.push(labels)
    for (let c = 0; c < labels.length; c++) {
      styles[`${r},${c}`] = {
        fill: { fgColor: { rgb: bgColor.replace('#','') } },
        font: { color: { rgb: 'FFFFFF' }, bold: true, sz: 11 },
        alignment: { vertical: 'center', horizontal: 'left' }
      }
    }
    r++
  }

  const addRow = (label: string, value: any, score?: number | null, extra?: any) => {
    rows.push([label, value, score === null || score === undefined ? '—' : score, extra || ''])
    styles[`${r},0`] = { fill: { fgColor: { rgb: 'F4F6F9' } }, font: { color: { rgb: '3B5070' }, bold: true, sz: 10 }, alignment: { vertical: 'center', wrapText: true } }
    styles[`${r},1`] = { font: { color: { rgb: '1A1A2E' }, sz: 10 }, alignment: { vertical: 'center', wrapText: true } }
    if (score !== undefined) {
      const bgColor = scoreBg(score).replace('#','')
      const textColor = scoreColor(score).replace('#','')
      styles[`${r},2`] = { fill: { fgColor: { rgb: bgColor } }, font: { color: { rgb: textColor }, bold: true, sz: 11 }, alignment: { vertical: 'center', horizontal: 'center' } }
    }
    r++
  }

  const addSpacer = () => { rows.push(['', '', '', '']); r++ }

  addHeader("STARTUP DIAGNOSIS REPORT — InUnity Private Limited", '#0F2647', '#E8A020', 13)
  addSpacer()

  addHeader("1. BASIC INFORMATION")
  addRow("Team Name", team.teamName)
  addRow("Startup Name", team.startupName)
  addRow("Sector", team.sector === 'Other' ? `Other (${team.sectorOther})` : team.sector)
  addRow("Institution", team.institution)
  addRow("Team Size", team.teamSize)
  addRow("Team Members/Roles", team.roles)
  addRow("Interview Date", team.interviewDate)
  addRow("Interviewer", team.interviewer)
  addSpacer()

  addHeader("2. PROBLEM & SOLUTION")
  addSubHeader(["Field", "Answer", "Score /5", "—"], '#1A7A6E')
  addRow("Problem Statement", team.problemStatement, team.problemScore)
  addRow("Solution Description", team.solutionDescription, team.solutionScore)
  addRow("Product Type", team.productType === 'Other' ? `Other (${team.productTypeOther})` : team.productType)
  addRow("Unique Value Proposition", team.uniqueValue, team.uniqueValueScore)
  addSpacer()

  addHeader("3. MARKET RESEARCH & CUSTOMER VALIDATION")
  addSubHeader(["Field", "Answer", "Score /5", "—"], '#E84B3A')
  addRow("No. of Users Tested With", team.usersTested)
  addRow("No. of Stakeholder Interactions", team.stakeholdersInteracted)
  addRow("Types of Stakeholders", team.stakeholderTypes)
  addRow("Testing & Interaction Details", team.testingDetails)
  addRow("Customer Interview Details", team.customerInterviewDetails, team.customerInterviewScore)
  addRow("Competitor Analysis", team.competitorDetails, team.competitorScore)
  addRow("Market Size Awareness", team.marketSizeDetails, team.marketSizeScore)
  addSpacer()

  addHeader("4. BUSINESS MODEL & REVENUE")
  addSubHeader(["Field", "Answer", "Score /5", "—"], '#5B4FCF')
  addRow("Revenue Model Details", team.revenueModelDetails, team.revenueModelScore)
  addRow("BMC Details", team.bmcDetails, team.bmcScore)
  addRow("Revenue Stage", team.revenueStage)
  addRow("Business Model Type", team.businessModelType)
  addRow("BMC Completion Status", team.bmcDone)
  addSpacer()

  addHeader("5. READINESS LEVELS (TRL / BRL / CRL)")
  addSubHeader(["Level", "Score (1–9)", "Interpretation", ""], '#0F2647')
  addRow("TRL — Technology Readiness", team.trl, null, interpretTRL(team.trl))
  addRow("BRL — Business Readiness", team.brl, null, interpretTRL(team.brl))
  addRow("CRL — Customer Readiness", team.crl, null, interpretTRL(team.crl))
  addSpacer()

  addHeader("6. PITCH READINESS")
  addSubHeader(["Field", "Answer", "Score /5", "—"], '#E8A020')
  addRow("Pitch Deck & Experience", team.pitchDeckDetails, team.pitchDeckScore)
  addRow("Elevator Pitch (60 sec)", team.elevatorDetails, team.elevatorScore)
  addRow("Investor Ask Clarity", team.investorAskDetails, team.investorAskScore)
  addSpacer()

  addHeader("7. SCORES SUMMARY")
  addSubHeader(["Dimension", "Score /5", "Status", ""], '#1A7A6E')
  addRow("Problem & Solution", scores.problem, scores.problem, scoreLabel(scores.problem))
  addRow("Market & Customers", scores.market, scores.market, scoreLabel(scores.market))
  addRow("Business Model", scores.biz, scores.biz, scoreLabel(scores.biz))
  addRow("Pitch Readiness", scores.pitch, scores.pitch, scoreLabel(scores.pitch))
  
  rows.push(["OVERALL READINESS", scores.overall, scores.overall, scoreLabel(scores.overall)])
  styles[`${r},0`] = styles[`${r},1`] = styles[`${r},2`] = styles[`${r},3`] = { fill: { fgColor: { rgb: 'E8A020' } }, font: { color: { rgb: '0F2647' }, bold: true } }
  r++
  addSpacer()

  addHeader("8. DIAGNOSIS & FINDINGS")
  addRow("Key Strengths", team.strengths)
  addRow("Key Gaps", team.gaps)
  addRow("Recommended Modules", team.modules)
  addSpacer()

  addHeader("9. PROGRAMME NEEDS")
  addRow("P0 — Immediate", team.p0)
  styles[`${r-1},0`].fill = { fgColor: { rgb: 'FDECEA' } }; styles[`${r-1},0`].font.color = { rgb: 'E84B3A' }
  addRow("P1 — Short-term", team.p1)
  styles[`${r-1},0`].fill = { fgColor: { rgb: 'FDF3DC' } }; styles[`${r-1},0`].font.color = { rgb: 'E8A020' }
  addRow("P2 — Medium-term", team.p2)
  styles[`${r-1},0`].fill = { fgColor: { rgb: 'D8F0ED' } }; styles[`${r-1},0`].font.color = { rgb: '1A7A6E' }
  addRow("Participation Barriers", team.barriers)
  addSpacer()

  addHeader("10. INDIVIDUAL ROADMAP")
  addSubHeader(["Priority", "Action / Milestone", "Support From", "By When"], '#0F2647')
  team.roadmap.forEach(item => {
    let color = 'navy'; let bg = 'FFFFFF'
    if (item.priority === 'P0') { color = 'E84B3A'; bg = 'FDECEA' }
    if (item.priority === 'P1') { color = 'E8A020'; bg = 'FDF3DC' }
    if (item.priority === 'P2') { color = '1A7A6E'; bg = 'D8F0ED' }
    rows.push([item.priority, item.action, item.supportFrom, item.byWhen])
    styles[`${r},0`] = { fill: { fgColor: { rgb: bg } }, font: { color: { rgb: color }, bold: true } }
    styles[`${r},1`] = { alignment: { wrapText: true } }
    r++
  })
  addSpacer()

  addHeader("11. MENTOR & NOTES")
  addRow("Mentor Assigned", team.mentor)
  addRow("Next Check-in Date", team.nextCheckin)
  addRow("Notes & Observations", team.notes)

  return { data: rows, merges, styles }
}

function buildScoreSummaryData(team: TeamProfile, scores: TeamScores) {
  const rows: any[] = []
  const merges: any[] = []
  const styles: any = {}
  let r = 0

  const addHeader = (text: string, bgColor = '#0F2647', textColor = '#E8A020') => {
    rows.push([text, '', ''])
    merges.push({ s: { r, c: 0 }, e: { r, c: 2 } })
    styles[`${r},0`] = { fill: { fgColor: { rgb: bgColor.replace('#','') } }, font: { color: { rgb: textColor.replace('#','') }, bold: true, sz: 12 }, alignment: { horizontal: 'center' } }
    r++
  }

  const addRow = (label: string, value: any, status?: string) => {
    rows.push([label, value, status || ''])
    styles[`${r},0`] = { font: { bold: true }, fill: { fgColor: { rgb: 'F4F6F9' } } }
    r++
  }

  addHeader("STARTUP DIAGNOSIS — SCORE SUMMARY")
  addRow("Startup Name", team.startupName)
  addRow("Sector", team.sector)
  addRow("Date", team.interviewDate)
  addRow("", "")
  addHeader("READINESS SCORES", '#0F2647', '#FFFFFF')
  addRow("Problem & Solution", scores.problem, scoreLabel(scores.problem))
  addRow("Market & Customers", scores.market, scoreLabel(scores.market))
  addRow("Business Model", scores.biz, scoreLabel(scores.biz))
  addRow("Pitch Readiness", scores.pitch, scoreLabel(scores.pitch))
  rows.push(["OVERALL READINESS", scores.overall, scoreLabel(scores.overall)])
  styles[`${r},0`] = styles[`${r},1`] = styles[`${r},2`] = { fill: { fgColor: { rgb: 'E8A020' } }, font: { bold: true } }
  r++

  return { data: rows, merges, styles }
}

function applyStyles(sheet: any, styles: any) {
  for (const key in styles) {
    const [r, c] = key.split(',').map(Number)
    const cellRef = XLSX.utils.encode_cell({ r, c })
    if (sheet[cellRef]) { sheet[cellRef].s = styles[key] }
  }
}
