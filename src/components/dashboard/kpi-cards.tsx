"use client"

import { Card, CardContent } from "@/components/ui/card"
import { RepFairnessData } from '@/lib/data/rep-fairness'
import { Users, TrendingUp, BarChart3, Flame, AlertTriangle, Thermometer } from "lucide-react"

type KPIItem = {
  label: string
  value: string
  icon: React.ReactNode
  accent?: boolean
  warn?: boolean
}

export function KPICards({ data }: { data: RepFairnessData[] }) {
  const n = data.length

  const avgRaw = n > 0
    ? (data.reduce((a, r) => a + parseFloat(r.raw_attainment_pct || '0'), 0) / n).toFixed(0)
    : '0'

  const avgAdj = n > 0
    ? (data.reduce((a, r) => a + parseFloat(r.ai_adjusted_score || '0'), 0) / n).toFixed(0)
    : '0'

  const hardMarketReps = data.filter(r => {
    const rating = (r.market_difficulty_rating || '').toLowerCase()
    return rating === 'high' || rating === 'hard'
  }).length

  const flaggedReps = data.filter(r => r.ai_flag && r.ai_flag !== 'On Track').length

  const avgHeat = n > 0
    ? (data.reduce((a, r) => a + parseFloat(r.market_heat_score || '0'), 0) / n).toFixed(0)
    : '0'

  const items: KPIItem[] = [
    { label: 'Total Reps', value: String(n), icon: <Users className="w-4 h-4" /> },
    { label: 'Avg Raw Attainment', value: `${avgRaw}%`, icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Avg AI-Adjusted', value: avgAdj, icon: <BarChart3 className="w-4 h-4" />, accent: true },
    { label: 'Hard-Market Reps', value: String(hardMarketReps), icon: <Flame className="w-4 h-4" /> },
    { label: 'Flagged for Review', value: String(flaggedReps), icon: <AlertTriangle className="w-4 h-4" />, warn: flaggedReps > 0 },
    { label: 'Avg Market Heat', value: avgHeat, icon: <Thermometer className="w-4 h-4" /> },
  ]

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
      {items.map((item) => (
        <Card
          key={item.label}
          className={`
            border 
            ${item.accent ? 'border-[#006aff]/20 bg-[#006aff]/[0.03]' : 'border-slate-200/80 bg-white'}
          `}
        >
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className={`
                p-1.5 rounded-md
                ${item.accent ? 'bg-[#006aff]/10 text-[#006aff]' : item.warn ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'}
              `}>
                {item.icon}
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{item.label}</span>
            </div>
            <div className={`text-3xl font-bold tracking-tight ${item.accent ? 'text-[#006aff]' : item.warn ? 'text-amber-600' : 'text-slate-900'}`}>
              {item.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
