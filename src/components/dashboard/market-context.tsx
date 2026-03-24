"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RepFairnessData } from '@/lib/data/rep-fairness'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { InfoTooltip } from '@/components/ui/info-tooltip'

function getBarColor(heat: number): string {
  if (heat >= 60) return '#006aff'   // hot market (easier)
  if (heat >= 45) return '#94a3b8'   // medium
  return '#ef4444'                    // cold market (harder)
}

export function MarketContextChart({ data }: { data: RepFairnessData[] }) {
  const metroMap = new Map<string, { heat: number; count: number }>()
  data.forEach(rep => {
    const heat = parseFloat(rep.market_heat_score || '0')
    const cur = metroMap.get(rep.metro_territory) || { heat: 0, count: 0 }
    metroMap.set(rep.metro_territory, { heat: cur.heat + heat, count: cur.count + 1 })
  })

  const chartData = Array.from(metroMap.entries())
    .map(([metro, s]) => ({ metro, heatScore: Math.round(s.heat / s.count) }))
    .sort((a, b) => a.heatScore - b.heatScore)

  return (
    <Card className="shadow-sm border-slate-200/80 bg-white h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-slate-900 flex items-center">
          Market Difficulty
          <InfoTooltip content="Average heat score from Zillow market data for each territory. Lower scores indicate harder markets (e.g., lower inventory, longer days on market), requiring more effort to close deals." />
        </CardTitle>
        <CardDescription className="text-slate-500">Zillow heat score by metro. Lower = harder market.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-[380px] pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 4 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
            <XAxis type="number" domain={[0, 100]} stroke="#cbd5e1" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis
              dataKey="metro"
              type="category"
              width={110}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }}
            />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px -2px rgb(0 0 0 / 0.08)', fontSize: '13px' }}
              formatter={(value: any) => [`${value}`, 'Heat Score']}
            />
            <Bar dataKey="heatScore" radius={[0, 6, 6, 0]} barSize={18}>
              {chartData.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={getBarColor(entry.heatScore)} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-5 mt-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" /> Hard (&lt;45)</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8]" /> Medium</div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#006aff]" /> Easy (60+)</div>
        </div>
      </CardContent>
    </Card>
  )
}
