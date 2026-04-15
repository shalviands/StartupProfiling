import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { TeamProfile } from '../types/team.types'

// ── Field mapping ────────────────────────────────────────────────
function mapDbToFrontend(row: Record<string, any>): TeamProfile {
  return {
    id:                        row.id                          ?? '',
    teamName:                  row.team_name                   ?? '',
    startupName:               row.startup_name                ?? '',
    sector:                    row.sector                      ?? '',
    institution:               row.institution                 ?? '',
    teamSize:                  row.team_size                   ?? '',
    roles:                     row.roles                       ?? '',
    interviewDate:             row.interview_date              ?? '',
    interviewer:               row.interviewer                 ?? '',
    problemStatement:          row.problem_statement           ?? '',
    problemScore:              Number(row.problem_score)       || 0,
    solutionDescription:       row.solution_description        ?? '',
    solutionScore:             Number(row.solution_score)      || 0,
    productType:               row.product_type                ?? '',
    productTypeOther:          row.product_type_other          ?? '',
    uniqueValue:               row.unique_value                ?? '',
    uniqueValueScore:          Number(row.unique_value_score)  || 0,
    usersTested:               Number(row.users_tested)        || 0,
    testingDetails:            row.testing_details             ?? '',
    stakeholdersInteracted:    Number(row.stakeholders_interacted) || 0,
    stakeholderTypes:          row.stakeholder_types           ?? '',
    customerInterviewDetails:  row.customer_interview_details  ?? '',
    customerInterviewScore:    Number(row.customer_interview_score) || 0,
    competitorDetails:         row.competitor_details          ?? '',
    competitorScore:           Number(row.competitor_score)    || 0,
    marketSizeDetails:         row.market_size_details         ?? '',
    marketSizeScore:           Number(row.market_size_score)   || 0,
    revenueModelDetails:       row.revenue_model_details       ?? '',
    revenueModelScore:         Number(row.revenue_model_score) || 0,
    bmcDetails:                row.bmc_details                 ?? '',
    bmcScore:                  Number(row.bmc_score)           || 0,
    revenueStage:              row.revenue_stage               ?? '',
    businessModelType:         row.business_model_type         ?? '',
    bmcDone:                   row.bmc_done                    ?? '',
    trl:                       row.trl?.toString()             ?? '',
    brl:                       row.brl?.toString()             ?? '',
    crl:                       row.crl?.toString()             ?? '',
    pitchDeckDetails:          row.pitch_deck_details          ?? '',
    pitchDeckScore:            Number(row.pitch_deck_score)    || 0,
    elevatorDetails:           row.elevator_details            ?? '',
    elevatorScore:             Number(row.elevator_score)      || 0,
    investorAskDetails:        row.investor_ask_details        ?? '',
    investorAskScore:          Number(row.investor_ask_score)  || 0,
    strengths:                 row.strengths                   ?? '',
    gaps:                      row.gaps                        ?? '',
    modules:                   row.modules                     ?? '',
    p0:                        row.p0_need                     ?? '',
    p1:                        row.p1_need                     ?? '',
    p2:                        row.p2_need                     ?? '',
    barriers:                  row.barriers                    ?? '',
    mentor:                    row.mentor                      ?? '',
    nextCheckin:               row.next_checkin                ?? '',
    notes:                     row.notes                       ?? '',
    roadmap:                   Array.isArray(row.roadmap_items) 
      ? row.roadmap_items.map((r: any) => ({
          priority: r.priority,
          action: r.action,
          supportFrom: r.support_from,
          byWhen: r.by_when
        }))
      : [
          { priority: 'P0', action: '', supportFrom: '', byWhen: '' },
          { priority: 'P0', action: '', supportFrom: '', byWhen: '' },
          { priority: 'P1', action: '', supportFrom: '', byWhen: '' },
          { priority: 'P2', action: '', supportFrom: '', byWhen: '' },
        ],
  }
}

// ── Query key ────────────────────────────────────────────────────
export const TEAMS_QUERY_KEY = ['teams'] as const

// ── useTeams hook ────────────────────────────────────────────────
export function useTeams() {
  return useQuery<TeamProfile[]>({
    queryKey: TEAMS_QUERY_KEY,
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('[useTeams] Supabase error:', error)
        throw error
      }

      console.log(`[useTeams] Fetched ${data?.length ?? 0} teams`)
      return (data ?? []).map(mapDbToFrontend)
    },
    staleTime: 30_000,
    retry: 2,
  })
}

// ── useInvalidateTeams ───────────────────────────────────────────
export function useInvalidateTeams() {
  const qc = useQueryClient()
  return () => qc.invalidateQueries({ queryKey: TEAMS_QUERY_KEY })
}
