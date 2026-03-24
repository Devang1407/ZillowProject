"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RepFairnessData } from '@/lib/data/rep-fairness'
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { InfoTooltip } from "@/components/ui/info-tooltip"

const FLAG_STYLES: Record<string, string> = {
  'At Risk': 'bg-red-100 text-red-700',
  'Under-Credited': 'bg-amber-100 text-amber-700',
  'On Track': 'bg-emerald-50 text-emerald-700',
}

function StatRow({ label, value, mono, tooltip }: { label: string; value: string | number | null | undefined; mono?: boolean; tooltip?: string }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-1.5 text-slate-500 text-[13px]">
        {label}
        {tooltip && <InfoTooltip content={tooltip} />}
      </div>
      <span className={`font-medium text-slate-800 text-[13px] ${mono ? 'font-mono' : ''}`}>{value ?? '—'}</span>
    </div>
  )
}

export function RepDetailDrawer({ rep, onClose }: { rep: RepFairnessData | null, onClose: () => void }) {
  return (
    <Sheet open={!!rep} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl p-0 flex flex-col h-full bg-[#f8f9fb] border-l border-slate-200/80 [&>button]:right-5 [&>button]:top-5 [&>button]:z-50 [&>button]:bg-white [&>button]:rounded-lg [&>button]:shadow-sm [&>button]:p-1.5 [&>button]:border [&>button]:border-slate-200">
        {rep && (
          <>
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shrink-0">
              <div className="h-1 bg-gradient-to-r from-[#006aff] via-[#0052cc] to-[#006aff]" />
              <div className="p-6 pb-5">
                <SheetHeader>
                  <div className="flex justify-between items-start pr-8">
                    <div>
                      <SheetTitle className="text-xl font-bold text-slate-900">{rep.rep_name}</SheetTitle>
                      <SheetDescription className="text-slate-500 mt-1 text-[13px]">
                        {rep.job_title} · {rep.segment} · {rep.region}
                      </SheetDescription>
                      <div className="text-[12px] text-slate-400 mt-0.5">{rep.email}</div>
                    </div>
                    <Badge className={`text-[11px] font-semibold border-0 ${FLAG_STYLES[rep.ai_flag] || 'bg-slate-100 text-slate-600'}`}>
                      {rep.ai_flag || 'None'}
                    </Badge>
                  </div>
                </SheetHeader>
              </div>
            </div>

            <ScrollArea className="flex-1 min-h-0 overflow-y-auto">
              <div className="p-6 space-y-6 pb-12">
                {/* Performance headline */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Raw Attainment</div>
                    <div className="text-3xl font-bold text-slate-900 tracking-tight">{rep.raw_attainment_pct}%</div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      ${parseInt(rep.actual_mtd_usd || '0').toLocaleString()} / ${parseInt(rep.quota_monthly_usd || '0').toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-[#006aff]/15 shadow-sm relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#006aff]/5 rounded-full" />
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#006aff] mb-2">AI Adjusted</div>
                    <div className="text-4xl font-bold text-[#006aff] tracking-tight">{rep.ai_adjusted_score}</div>
                  </div>
                </div>

                {/* Market Context */}
                <section>
                  <h3 className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-3">Market Context</h3>
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5">
                    <StatRow label="Metro Territory" value={rep.metro_territory} tooltip="The city or area where this person is trying to sell houses." />
                    <StatRow label="Difficulty Rating" value={rep.market_difficulty_rating} tooltip="How hard it is to sell houses here right now. 'High' means there are very few people looking to buy, or houses are way too expensive." />
                    <StatRow label="Zillow Heat Score" value={`${rep.market_heat_score} / 100`} mono tooltip="A grade out of 100 on how 'hot' or easy the market is. A high score means houses are selling super fast like umbrellas in the rain!" />
                    <StatRow label="Inventory Months" value={rep.inventory_months} mono tooltip="How many months it would take to sell all the houses currently for sale. A higher number means there are too many houses and not enough buyers." />
                    <StatRow label="Days on Market" value={rep.days_on_market} mono tooltip="How many days, on average, a house sits empty waiting for someone to buy it. Longer wait times mean it's harder to get buyers interested." />
                    <StatRow label="Price Cuts %" value={rep.price_cuts_pct ? `${rep.price_cuts_pct}%` : '—'} mono tooltip="The percentage of houses where sellers had to lower their price just to get someone to buy them. A high percentage means people are struggling to sell." />
                  </div>
                </section>

                {/* Pipeline */}
                <section>
                  <h3 className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-3">Pipeline & Tenure</h3>
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5">
                    <StatRow label="Tenure" value={rep.tenure_months != null ? `${rep.tenure_months} months` : '—'} tooltip="How many months this person has been working here." />
                    <StatRow label="Open Deals" value={rep.pipeline_open_deals} mono tooltip="How many people this salesperson is currently talking to who might buy a house soon." />
                    <StatRow label="Pipeline (weighted)" value={rep.pipeline_weighted_usd ? `$${parseInt(rep.pipeline_weighted_usd).toLocaleString()}` : '—'} mono tooltip="A guess at how much money they might make soon from the deals they are working on right now." />
                    <StatRow label="Stalled Stage" value={rep.pipeline_stage_stalled} tooltip="The specific step in the process where buyers usually change their minds, walk away, or stop talking to the salesperson." />
                    <StatRow label="Stalled Deals" value={rep.stalled_deals_count} mono tooltip="How many potential buyers have stopped replying or seem stuck right now." />
                  </div>
                </section>

                {/* Spiff History */}
                <section>
                  <h3 className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-3">Last Spiff</h3>
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5">
                    <StatRow label="Type" value={rep.last_spiff} tooltip="What kind of bonus or reward they got last time to cheer them up or motivate them to sell." />
                    <StatRow label="Response" value={rep.last_spiff_response} tooltip="What happened after they got the bonus. Did they sell more houses? Did they ignore it?" />
                    <StatRow label="Uplift" value={rep.last_spiff_uplift_pct ? `${rep.last_spiff_uplift_pct}%` : '—'} mono tooltip="How much their sales increased (%) right after we gave them the last bonus." />
                    <StatRow label="Date" value={rep.last_spiff_date} tooltip="When we last gave them a bonus." />
                  </div>
                </section>

                {/* Manager Memo */}
                <section>
                  <div className="flex items-center gap-1.5 mb-3">
                    <h3 className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Manager Memo</h3>
                    <InfoTooltip content="A short note explaining why this person's 'Fair Score' is different from their 'Basic Score'." />
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-slate-700 leading-relaxed text-[14px]">
                      {rep.ai_quota_explanation_memo || "No memo generated."}
                    </p>
                  </div>
                </section>

                {/* Spiff Recommendation */}
                <section>
                  <div className="flex items-center gap-1.5 mb-3">
                    <h3 className="text-[11px] font-semibold tracking-wider text-[#006aff] uppercase">Spiff Recommendation</h3>
                    <InfoTooltip content="What kind of reward or help the company should give this person right now to keep them happy and selling well." />
                  </div>
                  <div className="bg-[#006aff]/[0.04] p-5 rounded-xl border border-[#006aff]/10">
                    <p className="text-[#004ecb] leading-relaxed text-[14px] font-medium">
                      {rep.ai_weekly_spiff_recommendation || "No specific recommendation."}
                    </p>
                  </div>
                </section>
              </div>
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
