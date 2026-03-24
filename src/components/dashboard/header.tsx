"use client"

import { RepFairnessData } from '@/lib/data/rep-fairness'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function DashboardHeader({ data }: { data: RepFairnessData[] }) {
  const weekStart = data.length > 0 ? data[0].week_start : null
  const formattedWeek = weekStart
    ? new Date(weekStart + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Current'

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80">
      {/* Zillow-blue accent strip */}
      <div className="h-1 bg-gradient-to-r from-[#006aff] via-[#0052cc] to-[#006aff]" />
      <div className="flex items-center justify-between px-6 lg:px-12 py-4 max-w-[1560px] mx-auto w-full">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Sales Compensation Fairness
          </h1>
          <p className="text-[13px] text-slate-500 mt-0.5 max-w-xl">
            Raw attainment alone can misread performance when market difficulty differs.
            This view identifies under-credited reps and recommended actions.
          </p>
          <p className="text-[14px] text-slate-700 mt-3 font-medium border-l-2 border-[#006aff] pl-3 py-0.5">
            Start here: compare Raw Attainment and AI Adjusted Score to spot reps who may be judged unfairly.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" size="sm" className="text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900 font-medium" />}>
              <span className="hidden sm:inline">Learn how this works</span>
              <span className="sm:hidden">Learn</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh] bg-white text-slate-800">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-slate-900">How this dashboard works</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 text-[15px] pt-4 leading-relaxed">
                
                <section>
                  <h3 className="font-semibold text-slate-900 mb-2">The problem</h3>
                  <p className="text-slate-600">
                    Imagine two sales reps both sell 6 homes this month. At first, they look the same. 
                    But one rep is working in a city where homes are selling fast and buyers are active. 
                    The other rep is working in a city where homes sit longer, buyers are slower, and deals are harder to close.
                    <br/><br/>
                    Even if both reps sell the same number of homes, the second rep may be doing a harder job. 
                    This dashboard helps show that difference more fairly.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-slate-900 mb-2">What the main metrics mean</h3>
                  <ul className="space-y-3 list-none p-0 text-slate-600">
                    <li><strong className="text-slate-800 font-medium tracking-tight">Raw Attainment:</strong> how much of the rep's target they reached.</li>
                    <li><strong className="text-slate-800 font-medium tracking-tight">AI Adjusted Score:</strong> a fairer score after market difficulty is considered.</li>
                    <li><strong className="text-slate-800 font-medium tracking-tight">Market Heat Score:</strong> shows whether a market is easier or harder.</li>
                    <li><strong className="text-slate-800 font-medium tracking-tight">AI Flag:</strong> a quick signal showing who looks okay and who may need attention.</li>
                    <li><strong className="text-slate-800 font-medium tracking-tight">Spiff Recommendation:</strong> a suggested bonus or action for that rep.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-slate-900 mb-2">How to read the chart</h3>
                  <p className="text-slate-600 mb-2">Each dot on the chart is one sales rep.</p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li><strong>Dots further to the right</strong> reached more of their target.</li>
                    <li><strong>Dots higher up</strong> have a better adjusted score.</li>
                    <li><strong>Dots above the line</strong> may be doing a great job in a tough city and deserve more credit.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-slate-900 mb-2">Simple example</h3>
                  <p className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-[14px] italic text-slate-700">
                    "If Rep A and Rep B both seem average at first, but Rep A is working in a much harder market, Rep A may deserve a better score or more support. That is what this dashboard is trying to reveal."
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-slate-900 mb-2">What to look at first</h3>
                  <ul className="list-disc pl-5 space-y-2 text-slate-700">
                    <li>Check the summary cards for the big picture.</li>
                    <li>Look at the chart to spot reps who might be judged unfairly.</li>
                    <li>Click a rep to see the full story and suggested action.</li>
                  </ul>
                </section>

              </div>
            </DialogContent>
          </Dialog>

          <Badge className="bg-[#006aff]/10 text-[#006aff] hover:bg-[#006aff]/15 border-0 font-semibold text-xs px-3 py-1.5 whitespace-nowrap">
            Week of {formattedWeek}
          </Badge>
        </div>
      </div>
    </header>
  )
}
