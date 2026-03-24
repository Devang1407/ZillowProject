"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RepFairnessData } from '@/lib/data/rep-fairness'
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { InfoTooltip } from '@/components/ui/info-tooltip'

export function ActionsPanel({ data, onSelectRep }: { data: RepFairnessData[], onSelectRep: (rep: RepFairnessData) => void }) {
  const needsAttention = data
    .filter(rep => rep.ai_flag === 'At Risk' || rep.ai_flag === 'Under-Credited')
    .sort((a, b) => {
      // At Risk first, then Under-Credited
      if (a.ai_flag === 'At Risk' && b.ai_flag !== 'At Risk') return -1
      if (a.ai_flag !== 'At Risk' && b.ai_flag === 'At Risk') return 1
      return parseFloat(a.ai_adjusted_score) - parseFloat(b.ai_adjusted_score)
    })

  return (
    <Card className="shadow-sm border-slate-200/80 bg-white flex flex-col h-[520px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-slate-900 flex items-center">
          Action Required
          <InfoTooltip content="Reps grouped by required manager attention. Includes AI-generated memos explaining quota adjustment recommendations and suggested spiffs." />
        </CardTitle>
        <CardDescription className="text-slate-500">{needsAttention.length} reps need manager attention</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto space-y-3">
        {needsAttention.map(rep => (
          <button
            key={rep.rep_external_id}
            onClick={() => onSelectRep(rep)}
            className="w-full text-left p-4 bg-slate-50/50 border border-slate-200/80 rounded-xl transition-all hover:shadow-md hover:border-slate-300 hover:bg-white group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold text-slate-800 text-[14px]">{rep.rep_name}</span>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold whitespace-nowrap ${
                rep.ai_flag === 'At Risk'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {rep.ai_flag}
              </span>
            </div>
            <p className="text-[12px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
              {rep.ai_quota_explanation_memo}
            </p>
            <div className="flex items-center text-[12px] text-[#006aff] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              View briefing <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </button>
        ))}
        {needsAttention.length === 0 && (
          <div className="text-center text-slate-400 py-12 text-sm">
            All reps are on track. No action required.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
