"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RepFairnessData } from '@/lib/data/rep-fairness'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine, Cell, Legend } from 'recharts'
import { InfoTooltip } from '@/components/ui/info-tooltip'

const FLAG_COLORS: Record<string, string> = {
  'On Track': '#006aff',
  'At Risk': '#ef4444',
  'Under-Credited': '#f59e0b',
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-4 text-[13px] min-w-[200px]">
      <p className="font-bold text-slate-900 text-sm mb-1">{d.rep_name}</p>
      <p className="text-slate-500 mb-2">{d.metro_territory}</p>
      <div className="flex justify-between mb-1">
        <span className="text-slate-500">Raw Attainment</span>
        <span className="font-semibold text-slate-800">{d.raw_attainment_pct}%</span>
      </div>
      <div className="flex justify-between mb-1">
        <span className="text-slate-500">AI Adjusted</span>
        <span className="font-bold text-[#006aff]">{d.ai_adjusted_score}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-slate-500">Flag</span>
        <span className="font-semibold" style={{ color: FLAG_COLORS[d.ai_flag] || '#64748b' }}>{d.ai_flag}</span>
      </div>
    </div>
  )
}

const renderLegend = () => (
  <div className="flex items-center justify-center gap-6 mt-2 text-xs text-slate-500">
    {Object.entries(FLAG_COLORS).map(([label, color]) => (
      <div key={label} className="flex items-center gap-1.5">
        <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
        {label}
      </div>
    ))}
  </div>
)

export function FairnessChart({ data, onSelectRep }: { data: RepFairnessData[], onSelectRep?: (rep: RepFairnessData) => void }) {
  const chartData = data.map(rep => ({
    ...rep,
    raw_attainment_pct: parseFloat(rep.raw_attainment_pct || '0'),
    ai_adjusted_score: parseFloat(rep.ai_adjusted_score || '0'),
  }))

  const maxVal = Math.max(
    ...chartData.map(d => Math.max(d.raw_attainment_pct, d.ai_adjusted_score)),
    110
  )

  // Generate parity line points (x = y)
  const parityLine = [
    { x: 0, y: 0 },
    { x: maxVal + 10, y: maxVal + 10 },
  ]

  return (
    <Card className="shadow-sm border-slate-200/80 bg-white h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-slate-900 flex items-center">
          Performance vs Market Fairness
          <InfoTooltip content="Comparing raw quota attainment against AI-adjusted expected performance based on market difficulty. Dots above the parity line reveal reps whose real underlying performance is likely stronger than their raw win rate suggests." />
        </CardTitle>
        <CardDescription className="text-slate-500">
          Dots above the parity line indicate reps whose adjusted score exceeds their raw attainment — they may be under-credited.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-[380px] pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 45, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              type="number"
              dataKey="raw_attainment_pct"
              name="Raw Attainment"
              tickFormatter={(v) => `${v}%`}
              domain={[0, maxVal + 10]}
              label={{ value: 'Raw Attainment (%)', position: 'insideBottom', offset: -24, fill: '#64748b', fontSize: 12 }}
              stroke="#cbd5e1"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis
              type="number"
              dataKey="ai_adjusted_score"
              name="AI Adjusted Score"
              domain={[0, maxVal + 10]}
              label={{ value: 'AI Adjusted Score', angle: -90, position: 'insideLeft', offset: 4, fill: '#64748b', fontSize: 12 }}
              stroke="#cbd5e1"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <RechartsTooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#94a3b8' }} />
            {/* Parity line (y = x) */}
            <Scatter name="parity" data={parityLine} dataKey="y" fill="none" line={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '6 4' }} isAnimationActive={false}>
              {parityLine.map((_, i) => <Cell key={i} fill="transparent" r={0} />)}
            </Scatter>
            <Scatter 
              name="Reps" 
              data={chartData} 
              isAnimationActive
              cursor={onSelectRep ? "pointer" : "default"}
              onClick={(e: any) => {
                if (onSelectRep && e?.payload) {
                  onSelectRep(e.payload as RepFairnessData)
                }
              }}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={FLAG_COLORS[entry.ai_flag] || '#94a3b8'}
                  r={7}
                  opacity={0.85}
                  stroke={FLAG_COLORS[entry.ai_flag] || '#94a3b8'}
                  strokeWidth={1.5}
                  fillOpacity={0.25}
                />
              ))}
            </Scatter>
            <Legend content={renderLegend} wrapperStyle={{ bottom: 0 }} />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
