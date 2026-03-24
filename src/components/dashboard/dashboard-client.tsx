"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { RepFairnessData } from "@/lib/data/rep-fairness"
import { DashboardHeader } from "./header"
import { KPICards } from "./kpi-cards"
import { FairnessChart } from "./fairness-chart"
import { MarketContextChart } from "./market-context"
import { RepLeaderboard } from "./rep-leaderboard"
import { ActionsPanel } from "./actions-panel"
import { RepDetailDrawer } from "./rep-detail-drawer"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
}

export function DashboardClient({ data }: { data: RepFairnessData[] }) {
  const [selectedRep, setSelectedRep] = useState<RepFairnessData | null>(null)

  return (
    <div className="flex flex-col bg-[#f8f9fb] min-h-screen text-slate-900">
      <DashboardHeader data={data} />
      <motion.main
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex-1 space-y-8 pt-8 pb-16 px-4 md:px-8 lg:px-12 max-w-[1560px] mx-auto w-full"
      >
        <motion.div variants={fadeUp}>
          <KPICards data={data} />
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-8 grid-cols-1 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <FairnessChart data={data} onSelectRep={setSelectedRep} />
          </div>
          <div className="lg:col-span-2">
            <MarketContextChart data={data} />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="grid gap-8 grid-cols-1 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RepLeaderboard data={data} onSelectRep={setSelectedRep} />
          </div>
          <div className="xl:col-span-1">
            <ActionsPanel data={data} onSelectRep={setSelectedRep} />
          </div>
        </motion.div>

        {/* Prototype Honesty Note */}
        <motion.div variants={fadeUp} className="pt-8 pb-4 flex justify-center">
          <p className="text-[13px] text-slate-400 font-medium text-center max-w-lg">
            Prototype built on a 20-rep sample to validate the fairness workflow.
          </p>
        </motion.div>
      </motion.main>
      <RepDetailDrawer rep={selectedRep} onClose={() => setSelectedRep(null)} />
    </div>
  )
}
