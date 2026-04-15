export interface RoadmapItem {
  priority: 'P0' | 'P1' | 'P2'
  action: string
  supportFrom: string
  byWhen: string
}

export interface TeamProfile {
  id: string
  teamName: string
  startupName: string
  sector: string
  sectorOther?: string
  institution: string
  teamSize: string
  roles: string
  interviewDate: string
  interviewer: string

  // Section 2 — Problem & Solution
  problemStatement: string
  problemScore: number
  solutionDescription: string
  solutionScore: number
  productType: string
  productTypeOther: string
  uniqueValue: string
  uniqueValueScore: number

  // Section 3 — Market & Validation
  usersTested: number
  testingDetails: string
  stakeholdersInteracted: number
  stakeholderTypes: string
  customerInterviewDetails: string
  customerInterviewScore: number
  competitorDetails: string
  competitorScore: number
  marketSizeDetails: string
  marketSizeScore: number

  // Section 4 — Business Model
  revenueModelDetails: string
  revenueModelScore: number
  bmcDetails: string
  bmcScore: number
  revenueStage: string
  businessModelType: string
  bmcDone: string

  // Section 5 — Readiness
  trl: string
  brl: string
  crl: string

  // Section 6 — Pitch
  pitchDeckDetails: string
  pitchDeckScore: number
  elevatorDetails: string
  elevatorScore: number
  investorAskDetails: string
  investorAskScore: number

  // Section 7 — Diagnosis
  strengths: string
  gaps: string
  modules: string
  p0: string
  p1: string
  p2: string
  barriers: string
  mentor: string
  nextCheckin: string
  notes: string
  roadmap: RoadmapItem[]
}

export interface TeamScores {
  problem: number | null
  market:  number | null
  biz:     number | null
  pitch:   number | null
  overall: number | null
}

export const DEFAULT_TEAM: Omit<TeamProfile, 'id'> = {
  teamName: '', startupName: '', sector: '', sectorOther: '', institution: '',
  teamSize: '', roles: '',
  interviewDate: new Date().toISOString().split('T')[0],
  interviewer: '',
  problemStatement: '', problemScore: 0,
  solutionDescription: '', solutionScore: 0,
  productType: '', productTypeOther: '', uniqueValue: '',
  uniqueValueScore: 0,
  usersTested: 0, testingDetails: '', stakeholdersInteracted: 0,
  stakeholderTypes: '', customerInterviewDetails: '',
  customerInterviewScore: 0, competitorDetails: '',
  competitorScore: 0, marketSizeDetails: '', marketSizeScore: 0,
  revenueModelDetails: '', revenueModelScore: 0,
  bmcDetails: '', bmcScore: 0, revenueStage: '',
  businessModelType: '', bmcDone: '',
  trl: '1', brl: '1', crl: '1',
  pitchDeckDetails: '', pitchDeckScore: 0,
  elevatorDetails: '', elevatorScore: 0,
  investorAskDetails: '', investorAskScore: 0,
  strengths: '', gaps: '', modules: '',
  p0: '', p1: '', p2: '', barriers: '',
  mentor: '', nextCheckin: '', notes: '',
  roadmap: [
    { priority: 'P0', action: '', supportFrom: '', byWhen: '' },
    { priority: 'P0', action: '', supportFrom: '', byWhen: '' },
    { priority: 'P1', action: '', supportFrom: '', byWhen: '' },
    { priority: 'P2', action: '', supportFrom: '', byWhen: '' },
  ],
}
