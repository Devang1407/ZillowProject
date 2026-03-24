import { supabase } from '@/lib/supabase/client'

export type RepFairnessData = {
  week_start: string
  rep_external_id: string
  email: string
  first_name: string
  last_name: string
  rep_name: string
  job_title: string
  segment: string
  metro_territory: string
  region: string
  quota_monthly_usd: string
  actual_mtd_usd: string
  attainment_pct: string
  tenure_months: number
  pipeline_open_deals: number
  pipeline_weighted_usd: string
  pipeline_stage_stalled: string
  stalled_deals_count: number
  last_spiff: string
  last_spiff_response: string
  last_spiff_uplift_pct: string
  last_spiff_date: string
  inventory_months: string
  days_on_market: string
  price_cuts_pct: string
  market_heat_score: string
  market_source: string
  raw_attainment_pct: string
  market_difficulty_rating: string
  ai_adjusted_score: string
  ai_flag: string
  ai_weekly_spiff_recommendation: string
  ai_quota_explanation_memo: string
  ai_created_at: string
  rep_created_at: string
  market_created_at: string
}

export type FetchResult = {
  data: RepFairnessData[]
  error: string | null
}

export async function getRepFairnessData(): Promise<FetchResult> {
  try {
    const { data, error } = await supabase
      .from('v_dashboard_rep_fairness')
      .select('*')

    if (error) {
      console.error('[Supabase] Error fetching rep fairness data:', error.message, error.details, error.hint)
      return { data: [], error: error.message }
    }

    return { data: (data || []) as RepFairnessData[], error: null }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown fetch error'
    console.error('[Supabase] Unexpected error:', message)
    return { data: [], error: message }
  }
}
