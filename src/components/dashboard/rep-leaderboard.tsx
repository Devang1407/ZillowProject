"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RepFairnessData } from '@/lib/data/rep-fairness'
import { Badge } from "@/components/ui/badge"
import { InfoTooltip } from '@/components/ui/info-tooltip'

const FLAG_STYLES: Record<string, string> = {
  'At Risk': 'bg-red-100 text-red-700 border-red-200',
  'Under-Credited': 'bg-amber-100 text-amber-700 border-amber-200',
  'On Track': 'bg-emerald-50 text-emerald-700 border-emerald-200',
}

const ROW_LEFT_BORDER: Record<string, string> = {
  'At Risk': 'border-l-red-500',
  'Under-Credited': 'border-l-amber-500',
  'On Track': 'border-l-transparent',
}

export function RepLeaderboard({ data, onSelectRep }: { data: RepFairnessData[], onSelectRep: (rep: RepFairnessData) => void }) {
  const sorted = [...data].sort((a, b) => {
    const w: Record<string, number> = { 'At Risk': 3, 'Under-Credited': 2, 'On Track': 1 }
    const wA = w[a.ai_flag] || 0
    const wB = w[b.ai_flag] || 0
    if (wA !== wB) return wB - wA
    return parseFloat(b.ai_adjusted_score) - parseFloat(a.ai_adjusted_score)
  })

  return (
    <Card className="shadow-sm border-slate-200/80 bg-white flex flex-col h-[520px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-slate-900 flex items-center">
          Rep Assessment
          <InfoTooltip content="Complete assessment of all representatives. Sorted by flag priority and AI-adjusted score." />
        </CardTitle>
        <CardDescription className="text-slate-500">Click any row to open the analyst briefing panel.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto px-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-slate-50/80">
              <TableHead className="pl-6 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Rep</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Territory</TableHead>
              <TableHead className="text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">Raw %</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Difficulty</TableHead>
              <TableHead className="text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">Adjusted</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Flag</TableHead>
              <TableHead className="pr-6 text-[11px] font-semibold uppercase tracking-wider text-slate-500 hidden lg:table-cell">Spiff Rec.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((rep) => (
              <TableRow
                key={rep.rep_external_id}
                className={`cursor-pointer hover:bg-blue-50/40 transition-colors border-l-[3px] ${ROW_LEFT_BORDER[rep.ai_flag] || 'border-l-transparent'}`}
                onClick={() => onSelectRep(rep)}
              >
                <TableCell className="pl-6 font-medium text-slate-800 text-[13px]">{rep.rep_name}</TableCell>
                <TableCell className="text-slate-600 text-[13px] truncate max-w-[120px]" title={rep.metro_territory}>{rep.metro_territory}</TableCell>
                <TableCell className="text-right text-slate-600 font-mono text-[13px]">{rep.raw_attainment_pct}%</TableCell>
                <TableCell className="text-slate-600 text-[13px]">{rep.market_difficulty_rating}</TableCell>
                <TableCell className="text-right text-[#006aff] font-bold text-[13px]">{rep.ai_adjusted_score}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-[11px] font-semibold border ${FLAG_STYLES[rep.ai_flag] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                    {rep.ai_flag || 'N/A'}
                  </Badge>
                </TableCell>
                <TableCell className="pr-6 text-slate-500 text-[12px] truncate max-w-[220px] hidden lg:table-cell" title={rep.ai_weekly_spiff_recommendation}>
                  {rep.ai_weekly_spiff_recommendation}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
