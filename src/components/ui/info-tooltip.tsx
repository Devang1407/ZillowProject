import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export function InfoTooltip({ content }: { content: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        type="button"
        className="inline-flex items-center justify-center ml-1.5 p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors align-middle focus:outline-none focus:ring-2 focus:ring-slate-300"
      >
        <Info className="w-3.5 h-3.5" />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs bg-slate-900 text-white shadow-lg border-slate-800 pointer-events-none p-3 text-xs leading-relaxed z-50">
        {content}
      </TooltipContent>
    </Tooltip>
  )
}
