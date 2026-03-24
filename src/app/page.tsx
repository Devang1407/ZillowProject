import { getRepFairnessData } from '@/lib/data/rep-fairness'
import { DashboardClient } from '@/components/dashboard/dashboard-client'

export const revalidate = 300 // Revalidate every 5 minutes

export default async function DashboardPage() {
  const { data, error } = await getRepFairnessData()

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center max-w-md p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Unable to load dashboard data</h2>
          <p className="text-sm text-slate-500 mb-4">{error}</p>
          <p className="text-xs text-slate-400">Check your Supabase connection and environment variables.</p>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center max-w-md p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">No data available</h2>
          <p className="text-sm text-slate-500">The view <code className="bg-slate-100 px-1 rounded">v_dashboard_rep_fairness</code> returned no rows.</p>
        </div>
      </div>
    )
  }

  return <DashboardClient data={data} />
}
